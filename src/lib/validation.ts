export interface ValidationResult {
  isValid: boolean;
  error?: string;
  fileType?: 'PDF' | 'DOCX' | 'TXT' | 'CSV' | 'XLSX';
}

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB limit

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt', '.csv', '.xlsx'];

export const ALLOWED_MIME_TYPES: Record<string, 'PDF' | 'DOCX' | 'TXT' | 'CSV' | 'XLSX'> = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'text/plain': 'TXT',
  'text/csv': 'CSV',
  'application/vnd.ms-excel': 'CSV',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
};

/**
 * Validates file format, size, empty state, and MIME type before Supabase upload
 */
export function validateFactoryDocument(file: File): ValidationResult {
  // 1. Check for empty files
  if (!file || file.size === 0) {
    return {
      isValid: false,
      error: 'Cannot upload empty (0-byte) files. Please select a valid document.',
    };
  }

  // 2. Check file size cap
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `File size (${sizeInMB} MB) exceeds maximum allowed limit of 50 MB.`,
    };
  }

  // 3. Extract and validate file extension
  const filename = file.name.toLowerCase();
  const extensionMatch = filename.match(/\.[0-9a-z]+$/i);
  if (!extensionMatch) {
    return {
      isValid: false,
      error: 'File lacks a valid file extension.',
    };
  }

  const extension = extensionMatch[0];
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      error: `Invalid file format "${extension}". FactoryGPT accepts PDF, DOCX, TXT, CSV, and XLSX formats.`,
    };
  }

  // 4. Determine internal file type from extension / MIME
  let detectedType: 'PDF' | 'DOCX' | 'TXT' | 'CSV' | 'XLSX' = 'PDF';
  if (extension === '.pdf') detectedType = 'PDF';
  else if (extension === '.docx') detectedType = 'DOCX';
  else if (extension === '.txt') detectedType = 'TXT';
  else if (extension === '.csv') detectedType = 'CSV';
  else if (extension === '.xlsx') detectedType = 'XLSX';

  // 5. Check MIME type (soft warning check)
  if (file.type && ALLOWED_MIME_TYPES[file.type]) {
    detectedType = ALLOWED_MIME_TYPES[file.type];
  }

  return {
    isValid: true,
    fileType: detectedType,
  };
}
