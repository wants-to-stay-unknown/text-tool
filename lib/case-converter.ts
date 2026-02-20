export type CaseMode =
  | "uppercase"
  | "lowercase"
  | "title"
  | "capitalizeWords"
  | "sentence"
  | "fixSentenceCaps"
  | "toggle"
  | "trimExtraSpaces"
  | "camelToSnake"
  | "snakeToCamel";

export const MODE_HELP: Record<CaseMode, string> = {
  uppercase: "All letters become uppercase.",
  lowercase: "All letters become lowercase.",
  title: "Capitalize the first letter of each word.",
  capitalizeWords: "Capitalize every word consistently.",
  sentence: "Capitalize the first letter of each sentence.",
  fixSentenceCaps: "Capitalize after periods without lowercasing the rest.",
  toggle: "Swap each letter's case.",
  trimExtraSpaces: "Collapse extra spaces and trim each line.",
  camelToSnake: "Convert camelCase identifiers to snake_case.",
  snakeToCamel: "Convert snake_case identifiers to camelCase.",
};

export const MODE_LABEL: Record<CaseMode, string> = {
  uppercase: "UPPERCASE",
  lowercase: "lowercase",
  title: "Title Case",
  capitalizeWords: "Capitalize Each Word",
  sentence: "Sentence case",
  fixSentenceCaps: "Fix capitalization after period",
  toggle: "Toggle Case",
  trimExtraSpaces: "Trim extra spaces",
  camelToSnake: "camelCase → snake_case",
  snakeToCamel: "snake_case → camelCase",
};

const WORD_REGEX = /[A-Za-z0-9]+/g;

export function toUppercase(value: string) {
  return value.toUpperCase();
}

export function toLowercase(value: string) {
  return value.toLowerCase();
}

export function toTitleCase(value: string) {
  return value.toLowerCase().replace(WORD_REGEX, (word) => {
    if (word.length === 0) {
      return word;
    }
    return word[0].toUpperCase() + word.slice(1);
  });
}

export function capitalizeWords(value: string) {
  return value.replace(WORD_REGEX, (word) => {
    if (word.length === 0) {
      return word;
    }
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });
}

export function toSentenceCase(value: string) {
  let shouldCapitalize = true;

  return value.toLowerCase().replace(/./g, (char) => {
    if (/[a-z]/.test(char)) {
      const next = shouldCapitalize ? char.toUpperCase() : char;
      shouldCapitalize = false;
      return next;
    }

    if (/[.!?]/.test(char)) {
      shouldCapitalize = true;
    }

    return char;
  });
}

export function fixCapitalizationAfterPeriod(value: string) {
  let shouldCapitalize = true;

  return value.replace(/./g, (char) => {
    if (/[A-Za-z]/.test(char)) {
      const next = shouldCapitalize ? char.toUpperCase() : char;
      shouldCapitalize = false;
      return next;
    }

    if (/[.!?]/.test(char)) {
      shouldCapitalize = true;
    }

    return char;
  });
}

export function toToggleCase(value: string) {
  return value.replace(/[A-Za-z]/g, (char) =>
    char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
  );
}

export function toSnakeCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .replace(/__+/g, "_")
    .toLowerCase();
}

export function toCamelCase(value: string) {
  return value
    .toLowerCase()
    .replace(/[_-\s]+([a-z0-9])/g, (_, char: string) => char.toUpperCase());
}

export function toKebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/--+/g, "-")
    .toLowerCase();
}

export function trimExtraSpaces(value: string) {
  if (!value.trim()) {
    return "";
  }

  return value
    .split(/\r\n|\n/)
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function applyCaseMode(value: string, mode: CaseMode) {
  switch (mode) {
    case "uppercase":
      return toUppercase(value);
    case "lowercase":
      return toLowercase(value);
    case "title":
      return toTitleCase(value);
    case "capitalizeWords":
      return capitalizeWords(value);
    case "sentence":
      return toSentenceCase(value);
    case "fixSentenceCaps":
      return fixCapitalizationAfterPeriod(value);
    case "toggle":
      return toToggleCase(value);
    case "trimExtraSpaces":
      return trimExtraSpaces(value);
    case "camelToSnake":
      return toSnakeCase(value);
    case "snakeToCamel":
      return toCamelCase(value);
    default:
      return value;
  }
}
