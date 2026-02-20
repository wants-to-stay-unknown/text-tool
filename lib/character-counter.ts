export type CharacterPreset = {
  id: string;
  label: string;
  limit: number;
  helper: string;
};

export const CHARACTER_PRESETS: CharacterPreset[] = [
  {
    id: "twitter-x",
    label: "X / Twitter",
    limit: 280,
    helper: "280 characters per post (links count too).",
  },
  {
    id: "instagram",
    label: "Instagram caption",
    limit: 2200,
    helper: "2200 characters total, focus on the first 125.",
  },
  {
    id: "linkedin",
    label: "LinkedIn post",
    limit: 3000,
    helper: "3000 characters per post. Shorter is often stronger.",
  },
  {
    id: "meta-description",
    label: "Meta description",
    limit: 155,
    helper: "Aim for 150–160 characters for clean SERP display.",
  },
  {
    id: "youtube-title",
    label: "YouTube title",
    limit: 100,
    helper: "Keep titles within 100 characters for full display.",
  },
  {
    id: "sms",
    label: "SMS text",
    limit: 160,
    helper: "160 characters per SMS segment.",
  },
];
