'use client';

import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { validateFactoryDocument } from '@/lib/validation';
import { uploadDocument } from '@/lib/services/document-service';
import { FactoryDocument } from '@/lib/types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDoc: FactoryDocument) => void;
}

export function UploadModal({ isOpen, onClose, onUploadSuccess }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    setUploadSuccess(false);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateFactoryDocument(file);

      if (!validation.isValid) {
        setValidationError(validation.error || 'Invalid file selection.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setValidationError(null);

    const result = await uploadDocument(selectedFile);

    setUploading(false);

    if (!result.success || !result.document) {
      setValidationError(result.error || 'Failed to upload document to Supabase.');
      return;
    }

    setUploadSuccess(true);
    onUploadSuccess(result.document);

    setTimeout(() => {
      setSelectedFile(null);
      setUploadSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        if (!uploading) {
          setSelectedFile(null);
          setValidationError(null);
          setUploadSuccess(false);
          onClose();
        }
      }}
      title="Upload Factory Document to Supabase Storage"
      description="Select PDF, DOCX, TXT, CSV, or XLSX files (Max 50 MB)"
    >
      <div className="space-y-5">
        {/* Validation Error Alert */}
        {validationError && (
          <div className="p-3 bg-red-950/80 border border-red-800/80 rounded text-xs text-red-300 flex items-start gap-2 animate-in fade-in duration-200 font-mono">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Validation Error:</span> {validationError}
            </div>
          </div>
        )}

        {/* Upload Success Alert */}
        {uploadSuccess && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-800/80 rounded text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Document successfully uploaded and saved to Supabase Storage!</span>
          </div>
        )}

        {/* Drag & Drop Upload Zone */}
        <div className="border-2 border-dashed border-industrial-700 hover:border-accent-orange bg-industrial-950 p-8 rounded-lg text-center transition-colors">
          <input
            type="file"
            id="file-upload-input"
            accept=".pdf,.docx,.txt,.csv,.xlsx"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <label htmlFor="file-upload-input" className="cursor-pointer space-y-3 block">
            <div className="mx-auto w-12 h-12 rounded-full bg-industrial-900 border border-industrial-700 flex items-center justify-center text-accent-orange">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Click to select document</p>
              <p className="text-xs text-industrial-400 mt-1 font-mono">
                Formats: PDF, DOCX, TXT, CSV, XLSX (Non-empty files up to 50MB)
              </p>
            </div>
          </label>
        </div>

        {/* Selected File Card */}
        {selectedFile && (
          <div className="p-3 bg-industrial-900 rounded border border-industrial-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-accent-orange" />
              <div>
                <div className="text-xs font-semibold text-white truncate max-w-[220px]">
                  {selectedFile.name}
                </div>
                <div className="text-[10px] text-industrial-400 font-mono">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              disabled={uploading || uploadSuccess}
              onClick={handleUploadSubmit}
              icon={uploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : undefined}
            >
              {uploading ? 'Uploading to Bucket...' : 'Upload File'}
            </Button>
          </div>
        )}

        {/* Scope Note */}
        <div className="text-[11px] font-mono text-industrial-400 bg-industrial-950 p-3 rounded border border-industrial-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
          <span>
            Phase 2 Infrastructure: Files are validated and uploaded to Supabase Storage bucket <code className="text-white">factory-documents</code>. Text chunking & Gemini vector embeddings occur in Phase 3.
          </span>
        </div>
      </div>
    </Dialog>
  );
}
