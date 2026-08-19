import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabaseClient } from '@/lib/supabase/admin';
import { validateFactoryDocument } from '@/lib/validation';
import { processDocumentIngestion } from '@/lib/ingestion/ingest-pipeline';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided in request.' },
        { status: 400 }
      );
    }

    // 1. Validate File
    const validation = validateFactoryDocument(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const fileType = validation.fileType || 'PDF';
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `uploads/${timestamp}_${sanitizedName}`;
    const docId = `doc-${timestamp}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileText = fileBuffer.toString('utf-8');

    const adminSupabase = getAdminSupabaseClient();

    if (adminSupabase) {
      // 2. Ensure Storage Bucket exists using Service Role admin client
      const { data: buckets } = await adminSupabase.storage.listBuckets();
      const bucketExists = buckets?.some((b) => b.name === 'factory-documents');

      if (!bucketExists) {
        await adminSupabase.storage.createBucket('factory-documents', {
          public: false,
          fileSizeLimit: 52428800,
        });
      }

      // 3. Upload File to Supabase Storage bucket
      const { error: uploadError } = await adminSupabase.storage
        .from('factory-documents')
        .upload(storagePath, fileBuffer, {
          contentType: file.type || 'application/pdf',
          upsert: true,
        });

      if (uploadError) {
        console.warn('Storage upload warning:', uploadError.message);
      }

      // 4. Insert Metadata into Supabase 'documents' table
      const newRecord = {
        id: docId,
        filename: file.name,
        original_filename: file.name,
        file_type: fileType,
        file_size: file.size,
        storage_path: storagePath,
        status: 'uploaded',
        processing_error: uploadError ? uploadError.message : null,
      };

      const { data: insertedData, error: dbError } = await adminSupabase
        .from('documents')
        .insert(newRecord)
        .select()
        .single();

      if (!dbError && insertedData) {
        // Trigger Ingestion Pipeline
        processDocumentIngestion(insertedData.id, file.name, fileType, fileText);

        return NextResponse.json({
          success: true,
          document: {
            ...insertedData,
            sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            uploaderName: 'Eng. Sarah Jenkins',
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      document: {
        id: docId,
        filename: file.name,
        original_filename: file.name,
        file_type: fileType,
        file_size: file.size,
        storage_path: storagePath,
        status: 'uploaded',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploaderName: 'Eng. Sarah Jenkins',
      },
    });
  } catch (error: any) {
    console.error('Upload API route error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server upload failed.' },
      { status: 500 }
    );
  }
}
