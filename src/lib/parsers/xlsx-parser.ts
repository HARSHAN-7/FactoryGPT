import { ParsedSection } from './parser-factory';

export async function parseXlsxDocument(
  fileContent: string | ArrayBuffer,
  filename: string
): Promise<ParsedSection[]> {
  const text = typeof fileContent === 'string' ? fileContent : new TextDecoder('utf-8').decode(fileContent);
  const sheets = text.split(/(?:\[Sheet:\s*[^\]]+\]|--- Sheet [^---]+ ---)/i);

  const sections: ParsedSection[] = [];

  if (sheets.length <= 1) {
    sections.push({
      content: `XLSX Worksheet Data (${filename}):\n` + text.trim(),
      pageNumber: 1,
      sheetName: 'Sheet1',
      sectionTitle: 'Worksheet Content',
    });
  } else {
    sheets.forEach((sheetText, idx) => {
      if (sheetText.trim()) {
        sections.push({
          content: sheetText.trim(),
          pageNumber: idx + 1,
          sheetName: `Sheet${idx + 1}`,
          sectionTitle: `Sheet ${idx + 1} Tabular Data`,
        });
      }
    });
  }

  return sections;
}
