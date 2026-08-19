import { ParsedSection } from './parser-factory';

/**
 * PDF Document Parser - extracts text page-by-page preserving page numbers and section headers
 */
export async function parsePdfDocument(
  fileBuffer: ArrayBuffer | string,
  filename: string
): Promise<ParsedSection[]> {
  const sections: ParsedSection[] = [];
  const textContent = typeof fileBuffer === 'string' ? fileBuffer : new TextDecoder('utf-8').decode(fileBuffer);

  // Split content by explicit page breaks or double linebreaks simulating page boundaries
  const rawPages = textContent.split(/(?:--- Page \d+ ---|\n\s*\n\s*\n)/);

  if (rawPages.length <= 1) {
    // If single block or standard raw text
    const lines = textContent.split('\n');
    let currentSection = 'General Specifications';
    let currentBuffer: string[] = [];

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('#') || line.trim().startsWith('SECTION') || line.trim().startsWith('CHAPTER')) {
        if (currentBuffer.length > 0) {
          sections.push({
            content: currentBuffer.join('\n').trim(),
            pageNumber: 1,
            sectionTitle: currentSection,
          });
          currentBuffer = [];
        }
        currentSection = line.replace(/^[#\s]+/, '').trim();
      } else {
        currentBuffer.push(line);
      }
    });

    if (currentBuffer.length > 0) {
      sections.push({
        content: currentBuffer.join('\n').trim(),
        pageNumber: 1,
        sectionTitle: currentSection,
      });
    }
  } else {
    rawPages.forEach((pageText, idx) => {
      const pageNum = idx + 1;
      const cleanText = pageText.trim();
      if (cleanText.length > 0) {
        sections.push({
          content: cleanText,
          pageNumber: pageNum,
          sectionTitle: `Page ${pageNum} Content`,
        });
      }
    });
  }

  return sections;
}
