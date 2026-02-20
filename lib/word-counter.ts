export type WordCounterStats = {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
};

const SENTENCE_SPLIT_REGEX = /[.!?]+/;

export function countTextStats(value: string): WordCounterStats {
  const trimmed = value.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const characters = value.length;
  const charactersNoSpaces = value.replace(/\s/g, "").length;

  const lines = value.length === 0 ? 0 : value.split(/\r\n|\n/).length;
  const sentences =
    trimmed.length === 0
      ? 0
      : trimmed
          .split(SENTENCE_SPLIT_REGEX)
          .map((sentence) => sentence.trim())
          .filter(Boolean).length;
  const paragraphs =
    trimmed.length === 0
      ? 0
      : trimmed
          .split(/\n\s*\n+/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean).length;
  const readingTimeMinutes = words === 0 ? 0 : Math.ceil(words / 200);
  const speakingTimeMinutes = words === 0 ? 0 : Math.ceil(words / 130);

  return {
    words,
    characters,
    charactersNoSpaces,
    lines,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
  };
}
