export type Cefr = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Option = {
  text: string;
  feedback: string;
  feedbackGloss: string;
  correct?: boolean;
};

export type Trial = {
  prompt: string;
  promptGloss: string;
  hint: string;
  hintGloss: string;
  options: Option[];
};

export type Action = {
  id: string;
  label: string;
  labelGloss: string;
  text?: string;
  textGloss?: string;
  trial?: Trial;
};

export type Exit = {
  dir: string;
  to: string;
  label: string;
  labelGloss: string;
};

export type Room = {
  id: string;
  level: Cefr;
  place: string;
  placeGloss: string;
  word: string;
  pos: string;
  gloss: string;
  example: string;
  exampleGloss: string;
  grammar: string;
  scene: string;
  sceneGloss: string;
  scrap?: string;
  scrapGloss?: string;
  review?: boolean;
  actions: Action[];
  exits: Exit[];
  recall?: Trial;
};

export type District = {
  level: Cefr;
  name: string;
  epithet: string;
  blurb: string;
  start: string;
};

export function opt(
  text: string,
  feedback: string,
  feedbackGloss: string,
  correct = false,
): Option {
  return correct ? { text, feedback, feedbackGloss, correct: true } : { text, feedback, feedbackGloss };
}
