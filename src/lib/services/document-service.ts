import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { validateFactoryDocument } from '@/lib/validation';
import { FactoryDocument, DocumentStatus } from '@/lib/types';
import { INITIAL_DOCUMENTS } from '@/lib/mock-data';
import { processDocumentIngestion } from '../ingestion/ingest-pipeline';

let fallbackDocuments: FactoryDocument[] = [...INITIAL_DOCUMENTS];

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export async function fetchDocuments(): Promise<FactoryDocument[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((doc: any) => ({
          ...doc,
          sizeFormatted: formatBytes(doc.file_size || 0),
          uploaderName: doc.uploaded_by || 'Eng. Sarah Jenkins',
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch error, using fallback store:', err);
    }
  }

  return fallbackDocuments;
}

export async function uploadDocument(file: File): Promise<{ success: boolean; document?: FactoryDocument; error?: string }> {
  // 1. Validate file format, size, empty state
  const validation = validateFactoryDocument(file);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const fileType = validation.fileType || 'PDF';
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `uploads/${timestamp}_${sanitizedName}`;
  const docId = `doc-${timestamp}`;

  // Read file content for vector ingestion
  const fileText = await file.text();

  if (isSupabaseConfigured && supabase) {
    try {
      // 2. Upload file to Supabase Storage bucket 'factory-documents'
      const { error: storageError } = await supabase.storage
        .from('factory-documents')
        .upload(storagePath, file, { cacheControl: '3600', upsert: true });

      if (storageError) {
        return { success: false, error: `Supabase Storage upload failed: ${storageError.message}` };
      }

      // 3. Insert record into Supabase PostgreSQL 'documents' table
      const newRecord = {
        id: docId,
        filename: file.name,
        original_filename: file.name,
        file_type: fileType,
        file_size: file.size,
        storage_path: storagePath,
        status: 'uploaded' as DocumentStatus,
        processing_error: null,
      };

      const { data: insertedData, error: dbError } = await supabase
        .from('documents')
        .insert(newRecord)
        .select()
        .single();

      if (dbError) {
        return { success: false, error: `Database insertion error: ${dbError.message}` };
      }

      // 4. Trigger Ingestion Pipeline (Processing -> Extracting -> Chunking -> Embedding -> Indexed -> Completed)
      processDocumentIngestion(insertedData.id, file.name, fileType, fileText);

      const createdDoc: FactoryDocument = {
        ...insertedData,
        sizeFormatted: formatBytes(file.size),
        uploaderName: 'Eng. Sarah Jenkins',
      };

      return { success: true, document: createdDoc };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // Fallback Upload & Ingestion Execution
  const mockDoc: FactoryDocument = {
    id: docId,
    filename: file.name,
    original_filename: file.name,
    file_type: fileType,
    file_size: file.size,
    storage_path: storagePath,
    status: 'uploaded',
    uploaded_by: 'Eng. Sarah Jenkins',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sizeFormatted: formatBytes(file.size),
    uploaderName: 'Eng. Sarah Jenkins',
  };

  fallbackDocuments = [mockDoc, ...fallbackDocuments];

  // Execute full ingestion pipeline
  processDocumentIngestion(docId, file.name, fileType, fileText, (progress) => {
    fallbackDocuments = fallbackDocuments.map((d) =>
      d.id === docId ? { ...d, status: progress.stage as DocumentStatus } : d
    );
  });

  return { success: true, document: mockDoc };
}

export async function deleteDocument(id: string, storagePath?: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      if (storagePath) {
        await supabase.storage.from('factory-documents').remove([storagePath]);
      }
      await supabase.from('documents').delete().eq('id', id);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  fallbackDocuments = fallbackDocuments.filter((d) => d.id !== id);
  return { success: true };
}
