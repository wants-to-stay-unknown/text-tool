export type CaseMode =
  | "uppercase"
  | "lowercase"
  | "title"
  | "sentence"
  | "toggle";

export const MODE_HELP: Record<CaseMode, string> = {
  uppercase: "All letters become uppercase.",
  lowercase: "All letters become lowercase.",
  title: "Capitalize the first letter of each word.",
  sentence: "Capitalize the first letter of each sentence.",
  toggle: "Swap each letter's case.",
};

export const MODE_LABEL: Record<CaseMode, string> = {
  uppercase: "UPPERCASE",
  lowercase: "lowercase",
  title: "Title Case",
  sentence: "Sentence case",
  toggle: "Toggle Case",
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

export function toToggleCase(value: string) {
  return value.replace(/[A-Za-z]/g, (char) =>
    char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
  );
}

export function applyCaseMode(value: string, mode: CaseMode) {
  switch (mode) {
    case "uppercase":
      return toUppercase(value);
    case "lowercase":
      return toLowercase(value);
    case "title":
      return toTitleCase(value);
    case "sentence":
      return toSentenceCase(value);
    case "toggle":
      return toToggleCase(value);
    default:
      return value;
  }
}
