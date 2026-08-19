import { ParsedSection } from './parser-factory';

export async function parseTxtDocument(
  fileContent: string | ArrayBuffer,
  filename: string
): Promise<ParsedSection[]> {
  const text = typeof fileContent === 'string' ? fileContent : new TextDecoder('utf-8').decode(fileContent);
  const blocks = text.split(/\n\s*\n/);

  return blocks
    .filter(b => b.trim().length > 0)
    .map((block, idx) => ({
      content: block.trim(),
      pageNumber: Math.floor(idx / 5) + 1,
      sectionTitle: `Section ${idx + 1}`,
    }));
}
