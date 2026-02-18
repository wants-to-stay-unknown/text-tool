export type WordMetrics = {
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  pagesSingleSpaced: number;
  pagesDoubleSpaced: number;
  sentencesEstimate: number;
  paragraphsEstimate: number;
};

export function roundTo(value: number, decimals: number) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

export function getWordMetrics(count: number): WordMetrics {
  return {
    readingTimeMinutes: Math.ceil(count / 200),
    speakingTimeMinutes: Math.ceil(count / 130),
    pagesSingleSpaced: roundTo(count / 500, 1),
    pagesDoubleSpaced: roundTo(count / 250, 1),
    sentencesEstimate: Math.round(count / 20),
    paragraphsEstimate: Math.round(count / 150),
  };
}
