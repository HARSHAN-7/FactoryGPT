'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, Upload, RefreshCw, Database
} from 'lucide-react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { fetchDocuments, deleteDocument } from '@/lib/services/document-service';
import { FactoryDocument } from '@/lib/types';
import { DocumentTable } from '@/components/documents/DocumentTable';
import { UploadModal } from '@/components/documents/UploadModal';
import { Button } from '@/components/ui/Button';

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<FactoryDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const loadDocs = async () => {
    setIsLoading(true);
    const data = await fetchDocuments();
    setDocuments(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleDelete = async (id: string, storagePath?: string) => {
    setDocuments(documents.filter(d => d.id !== id));
    await deleteDocument(id, storagePath);
  };

  return (
    <div className="flex h-screen bg-industrial-950 text-industrial-100 overflow-hidden font-sans bg-grid-pattern">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-industrial-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-accent-orange" />
              Document Storage Management
            </h1>
            <p className="text-xs font-mono text-industrial-400 mt-1">
              Upload, inspect, and manage equipment PDFs, DOCX guides, and CSV data files in Supabase Storage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadDocs} icon={<RefreshCw className="w-3.5 h-3.5" />}>
              Refresh List
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsUploadOpen(true)} icon={<Upload className="w-4 h-4" />}>
              Upload Document
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center font-mono text-xs text-industrial-400 bg-industrial-900 rounded-lg border border-industrial-800">
            Loading document storage entries...
          </div>
        ) : (
          <DocumentTable
            documents={documents}
            onDeleteDocument={handleDelete}
            onReindexDocument={() => {}}
          />
        )}
      </main>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={(newDoc) => setDocuments([newDoc, ...documents])}
      />
    </div>
  );
}
