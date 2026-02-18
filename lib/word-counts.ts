export const WORD_COUNTS = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000,
  4000, 5000,
] as const;

export type WordCountValue = (typeof WORD_COUNTS)[number];
