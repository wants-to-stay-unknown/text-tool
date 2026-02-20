export type RemoveOptions = {
  caseSensitive: boolean;
  trimWhitespace: boolean;
  keepFirst: boolean;
  removeEmpty: boolean;
  removeExtraSpaces: boolean;
  sortLines: boolean;
};

export type RemoveResult = {
  output: string;
  totalLines: number;
  uniqueLines: number;
  removedDuplicates: number;
};

export const DEFAULT_OPTIONS: RemoveOptions = {
  caseSensitive: true,
  trimWhitespace: true,
  keepFirst: true,
  removeEmpty: false,
  removeExtraSpaces: false,
  sortLines: false,
};

export function detectLineBreak(value: string) {
  return value.includes("\r\n") ? "\r\n" : "\n";
}

export function getComparisonKey(line: string, options: RemoveOptions) {
  const base = options.trimWhitespace ? line.trim() : line;
  return options.caseSensitive ? base : base.toLowerCase();
}

export function normalizeLineSpacing(value: string) {
  return value.replace(/[ \t]+/g, " ").trim();
}

export function removeDuplicates(
  value: string,
  options: RemoveOptions
): RemoveResult {
  if (value.length === 0) {
    return {
      output: "",
      totalLines: 0,
      uniqueLines: 0,
      removedDuplicates: 0,
    };
  }

  const lineBreak = detectLineBreak(value);
  const rawLines = value.split(/\r\n|\n/);
  const lines = options.removeExtraSpaces
    ? rawLines.map((line) => normalizeLineSpacing(line))
    : rawLines;
  const seen = new Set<string>();

  const source = options.keepFirst ? lines : [...lines].reverse();
  const uniqueLines: string[] = [];

  for (const line of source) {
    const isEmpty = line.trim().length === 0;
    if (options.removeEmpty && isEmpty) {
      continue;
    }

    const key = getComparisonKey(line, options);
    if (seen.has(key)) {
      continue;
    }

    // When trimming for comparison, keep the original first (or last) instance.
    seen.add(key);
    uniqueLines.push(line);
  }

  if (!options.keepFirst) {
    uniqueLines.reverse();
  }

  const sortedLines = options.sortLines
    ? [...uniqueLines].sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
      )
    : uniqueLines;
  const output = sortedLines.join(lineBreak);
  const totalLines = lines.length;
  const uniqueCount = uniqueLines.length;
  const removedDuplicates = Math.max(0, totalLines - uniqueCount);

  return {
    output,
    totalLines,
    uniqueLines: uniqueCount,
    removedDuplicates,
  };
}
