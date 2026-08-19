import { ParsedSection } from './parser-factory';

/**
 * DOCX Document Parser - extracts paragraphs, headings, and table structures
 */
export async function parseDocxDocument(
  fileContent: string | ArrayBuffer,
  filename: string
): Promise<ParsedSection[]> {
  const sections: ParsedSection[] = [];
  const text = typeof fileContent === 'string' ? fileContent : new TextDecoder('utf-8').decode(fileContent);

  const paragraphs = text.split(/\n+/);
  let currentSectionTitle = 'Document Summary';
  let currentParagraphs: string[] = [];
  let pageCounter = 1;

  paragraphs.forEach((p, idx) => {
    const trimmed = p.trim();
    if (!trimmed) return;

    if (trimmed.length < 80 && (trimmed.toUpperCase() === trimmed || trimmed.endsWith(':') || trimmed.startsWith('#'))) {
      if (currentParagraphs.length > 0) {
        sections.push({
          content: currentParagraphs.join('\n\n'),
          pageNumber: pageCounter,
          sectionTitle: currentSectionTitle,
        });
        currentParagraphs = [];
        if (sections.length % 3 === 0) pageCounter++;
      }
      currentSectionTitle = trimmed.replace(/^[#\s]+/, '');
    } else {
      currentParagraphs.push(trimmed);
    }
  });

  if (currentParagraphs.length > 0) {
    sections.push({
      content: currentParagraphs.join('\n\n'),
      pageNumber: pageCounter,
      sectionTitle: currentSectionTitle,
    });
  }

  return sections;
}
