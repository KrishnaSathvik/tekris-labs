export type StoryStyle = "technical" | "planning" | "creative";

export interface StoryExcerpt {
  label: string;
  language: string;
  content: string;
}

export interface ProductStory {
  style: StoryStyle;
  /** Short topic shown after the category in the hero eyebrow. */
  subject: string;
  tagline: string;
  intro: string;
  about: string[];
  workflow: {
    title: string;
    problem: string;
    input?: StoryExcerpt;
    steps: string[];
    result: string;
  };
  expertise: { title: string; description: string }[];
  working: {
    provide: string[];
    expect: string[];
    limits: string;
  };
}
