import { detectLineBreak, normalizeLineSpacing } from "./remove-duplicates";

export type TextCleanerOptions = {
  removeDuplicateLines: boolean;
  removeEmptyLines: boolean;
  removeExtraSpaces: boolean;
  sortLines: boolean;
  uniqueList: boolean;
};

export type TextCleanerResult = {
  output: string;
  totalLines: number;
  outputLines: number;
  removedDuplicates: number;
};

export const DEFAULT_TEXT_CLEANER_OPTIONS: TextCleanerOptions = {
  removeDuplicateLines: true,
  removeEmptyLines: true,
  removeExtraSpaces: true,
  sortLines: false,
  uniqueList: false,
};

export function cleanText(
  value: string,
  options: TextCleanerOptions,
): TextCleanerResult {
  if (!value) {
    return { output: "", totalLines: 0, outputLines: 0, removedDuplicates: 0 };
  }

  const lineBreak = detectLineBreak(value);
  const rawLines = value.split(/\r\n|\n/);
  const normalizedLines = options.removeExtraSpaces
    ? rawLines.map((line) => normalizeLineSpacing(line))
    : rawLines;
  const lines = options.removeEmptyLines
    ? normalizedLines.filter((line) => line.trim().length > 0)
    : normalizedLines;

  let outputLines = [...lines];
  let removedDuplicates = 0;

  const uniqueListMode = options.uniqueList || options.removeDuplicateLines;

  if (uniqueListMode) {
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of outputLines) {
      const key = line.trim().toLowerCase();
      if (seen.has(key)) {
        removedDuplicates += 1;
        continue;
      }
      seen.add(key);
      unique.push(line);
    }

    outputLines = unique;
  }

  if (options.sortLines || options.uniqueList) {
    outputLines.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
    );
  }

  return {
    output: outputLines.join(lineBreak),
    totalLines: rawLines.length,
    outputLines: outputLines.length,
    removedDuplicates,
  };
}
