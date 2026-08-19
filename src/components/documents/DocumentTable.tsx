'use client';

import React, { useState } from 'react';
import { 
  FileText, Search, Trash2, RefreshCw, FileSpreadsheet, FileCode, File
} from 'lucide-react';
import { FactoryDocument, DocumentStatus } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface DocumentTableProps {
  documents: FactoryDocument[];
  onDeleteDocument: (id: string, storagePath?: string) => void;
  onReindexDocument: (id: string) => void;
}

export function DocumentTable({ documents, onDeleteDocument, onReindexDocument }: DocumentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredDocs = documents.filter((doc) => {
    const nameToSearch = doc.filename || doc.original_filename || '';
    const uploaderToSearch = doc.uploaderName || doc.uploaded_by || '';
    const matchesSearch = nameToSearch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          uploaderToSearch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || doc.status.toUpperCase() === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'CSV':
      case 'XLSX':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      case 'DOCX':
        return <FileCode className="w-4 h-4 text-blue-600" />;
      case 'TXT':
        return <File className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-amber-600" />;
    }
  };

  const renderStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'completed':
        return <Badge variant="indexed" dot>COMPLETED</Badge>;
      case 'processing':
        return <Badge variant="processing" dot>PROCESSING</Badge>;
      case 'uploading':
        return <Badge variant="orange" dot>UPLOADING</Badge>;
      case 'failed':
        return <Badge variant="failed" dot>FAILED</Badge>;
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search documents by name or uploader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-3.5 h-3.5" />}
            className="text-xs bg-slate-50"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'COMPLETED', 'PROCESSING', 'UPLOADING', 'FAILED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors uppercase ${
                statusFilter === status
                  ? 'bg-amber-500 text-slate-950 font-bold border border-amber-600'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">File Name</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Size</th>
                <th className="px-4 py-3 font-semibold">Ingestion Status</th>
                <th className="px-4 py-3 font-semibold">Storage Path</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500 font-mono">
                    No documents matching criteria in Supabase Storage
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {getTypeIcon(doc.file_type)}
                        <div>
                          <div className="font-semibold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer truncate max-w-xs">
                            {doc.filename || doc.original_filename}
                          </div>
                          {doc.processing_error ? (
                            <div className="text-[10px] text-red-600 font-mono">
                              Error: {doc.processing_error}
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500 font-mono">
                              By {doc.uploaderName || 'Eng. Sarah Jenkins'}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono">{doc.file_type}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">
                      {doc.sizeFormatted || `${(doc.file_size / 1024).toFixed(0)} KB`}
                    </td>
                    <td className="px-4 py-3">{renderStatusBadge(doc.status)}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-500 truncate max-w-[180px]">
                      {doc.storage_path}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onReindexDocument(doc.id)}
                          title="Re-sync metadata"
                          className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-amber-600 transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteDocument(doc.id, doc.storage_path)}
                          title="Delete file from bucket and database"
                          className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(doc.file_type)}
                  <span className="font-semibold text-slate-900 text-sm break-all">
                    {doc.filename || doc.original_filename}
                  </span>
                </div>
                {renderStatusBadge(doc.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded">
                <div>Type: <span className="text-slate-900 font-bold">{doc.file_type}</span></div>
                <div>Size: <span className="text-slate-900 font-bold">{doc.sizeFormatted || `${doc.file_size} B`}</span></div>
                <div className="col-span-2 truncate">Path: <span className="text-slate-700">{doc.storage_path}</span></div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteDocument(doc.id, doc.storage_path)}
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
