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

/**
 * Uploads document using Server-Side /api/upload Route (Service Role Admin Key bypasses client permission limits)
 */
export async function uploadDocument(file: File): Promise<{ success: boolean; document?: FactoryDocument; error?: string }> {
  // 1. Validate file format, size, empty state
  const validation = validateFactoryDocument(file);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Server upload failed');
    }

    return { success: true, document: data.document };
  } catch (err: any) {
    console.warn('Server /api/upload failed, falling back to local ingestion:', err);
  }

  // Fallback Upload & Ingestion Execution
  const docId = `doc-${Date.now()}`;
  const fileType = validation.fileType || 'PDF';
  const storagePath = `uploads/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const fileText = await file.text();

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
