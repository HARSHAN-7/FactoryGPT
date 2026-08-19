export type DocumentStatus = 
  | 'uploaded' 
  | 'uploading' 
  | 'processing' 
  | 'extracting' 
  | 'chunking' 
  | 'embedding' 
  | 'indexed' 
  | 'completed' 
  | 'failed';

export type FileType = 'PDF' | 'DOCX' | 'TXT' | 'CSV' | 'XLSX';

export interface FactoryDocument {
  id: string;
  filename: string;
  original_filename: string;
  file_type: FileType;
  file_size: number;
  storage_path: string;
  status: DocumentStatus;
  uploaded_by?: string;
  processing_error?: string | null;
  created_at: string;
  updated_at: string;
  sizeFormatted?: string;
  uploaderName?: string;
}

export interface ChatCitation {
  documentId: string;
  documentName: string;
  pageOrSection?: string;
  relevanceScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: ChatCitation[];
  isPhase1Placeholder?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  updatedAt: string;
  category: 'Maintenance' | 'Safety' | 'Data Analytics' | 'General';
  messageCount: number;
}

export interface SystemMetrics {
  totalDocuments: number;
  processedDocuments: number;
  failedDocuments: number;
  uploadingDocuments: number;
  totalConversations: number;
  knowledgeBaseHealth: number;
  vectorIndexSizeMB: number;
}

export interface UserSettings {
  factoryName: string;
  operatorRole: string;
  language: string;
  theme: 'dark' | 'light' | 'system';
  displayDensity: 'compact' | 'comfortable';
  voiceEnabled: boolean;
  modelProvider: string;
}
