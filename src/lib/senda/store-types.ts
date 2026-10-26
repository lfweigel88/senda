import type { Cefr } from "./types";

export type Mastery = "glimpsed" | "known" | "firm";

export type WordState = {
  status: Mastery;
  correct: number;
  wrong: number;
  knownAt: number;
};

export type TrialSource = "discover" | "echo" | "review";

export type ActiveTrial = {
  source: TrialSource;
  wordId: string;
  hint: boolean;
  picked: number | null;
};

export type ReviewRun = {
  ids: string[];
  step: number;
  correct: number;
  finished: boolean;
};

export type LogLine = {
  id: number;
  kind: "you" | "narration" | "system" | "good" | "bad";
  text: string;
  gloss?: string;
};

export type Panel = "words" | "map" | "notes" | null;

export type SendaData = {
  phase: "title" | "play";
  level: Cefr;
  roomId: string;
  visited: string[];
  lastRoom: Partial<Record<Cefr, string>>;
  words: Record<string, WordState>;
  sealed: Cefr[];
  showEnglish: boolean;
  sound: boolean;
  coached: boolean;
};
