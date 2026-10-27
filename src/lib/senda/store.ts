import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { playChime } from "./audio";
import {
  cityNamed,
  isMastered,
  levelStats,
  pickEcho,
  resolveTrial,
  sampleReview,
  silentRooms,
  unlockedRooms,
} from "./logic";
import type { ActiveTrial, LogLine, Panel, ReviewRun, SendaData, WordState } from "./store-types";
import type { Cefr } from "./types";
import { ROOM, districtOf } from "./world";

type State = SendaData & {
  hydrated: boolean;
  panel: Panel;
  log: LogLine[];
  logSeq: number;
  trial: ActiveTrial | null;
  review: ReviewRun | null;
};

type Actions = {
  resume: () => void;
  goLevel: (level: Cefr) => void;
  enterRoom: (id: string) => void;
  tryExit: (to: string) => void;
  doAction: (actionId: string) => void;
  hearEcho: () => void;
  startReview: () => void;
  showHint: () => void;
  answer: (index: number) => void;
  continueTrial: () => void;
  setPanel: (panel: Panel) => void;
  toggleEnglish: () => void;
  toggleSound: () => void;
  dismissCoach: () => void;
  reset: () => void;
};

const empty: SendaData = {
  phase: "title",
  level: "A1",
  roomId: "",
  visited: [],
  lastRoom: {},
  words: {},
  sealed: [],
  showEnglish: true,
  sound: true,
  coached: false,
};

function blankWord(): WordState {
  return { status: "glimpsed", correct: 0, wrong: 0, knownAt: 0 };
}

function memoryStorage() {
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

export const useSenda = create<State & Actions>()(
  persist(
    (set, get) => {
      const append = (lines: Omit<LogLine, "id">[]) => {
        set((state) => {
          let seq = state.logSeq;
          const log = [...state.log];
          for (const line of lines) {
            seq += 1;
            log.push({ ...line, id: seq });
          }
          return { log: log.slice(-48), logSeq: seq };
        });
      };

      return {
        ...empty,
        hydrated: false,
        panel: null,
        log: [],
        logSeq: 0,
        trial: null,
        review: null,

        resume: () => {
          const room = ROOM[get().roomId];
          if (!room) {
            set({ phase: "title" });
            return;
          }
          set({ phase: "play", level: room.level });
        },

        goLevel: (level) => {
          const id = get().lastRoom[level] ?? districtOf(level).start;
          get().enterRoom(id);
        },

        enterRoom: (id) => {
          const room = ROOM[id];
          if (!room) return;
          set((state) => {
            const words = { ...state.words };
            if (!room.review && !words[id]) words[id] = blankWord();
            const visited = state.visited.includes(id) ? state.visited : [...state.visited, id];
            return {
              phase: "play" as const,
              level: room.level,
              roomId: id,
              visited,
              words,
              lastRoom: { ...state.lastRoom, [room.level]: id },
              log: [],
              trial: null,
              review: null,
            };
          });
        },

        tryExit: (to) => {
          const state = get();
          const room = ROOM[state.roomId];
          if (!room || !room.exits.some((exit) => exit.to === to)) return;
          const open = unlockedRooms(room.level, state.words, state.visited);
          if (!open.has(to)) {
            append([
              {
                kind: "system",
                text: "La puerta no cede. Este cuarto todavía no reconoce su palabra.",
                gloss: "The door will not give. This room does not yet recognize its word.",
              },
            ]);
            return;
          }
          get().enterRoom(to);
        },

        doAction: (actionId) => {
          const state = get();
          const room = ROOM[state.roomId];
          const action = room?.actions.find((item) => item.id === actionId);
          if (!room || !action || state.trial) return;
          if (action.trial) {
            set({
              trial: { source: "discover", wordId: room.id, hint: false, picked: null },
              review: null,
            });
            append([{ kind: "you", text: action.label, gloss: action.labelGloss }]);
            return;
          }
          append([
            { kind: "you", text: action.label, gloss: action.labelGloss },
            { kind: "narration", text: action.text ?? "", gloss: action.textGloss },
          ]);
        },

        hearEcho: () => {
          const state = get();
          const room = ROOM[state.roomId];
          if (!room || room.review || state.trial || !isMastered(state.words, room.id)) return;
          const wordId = pickEcho(state.words, room.id, room.level);
          if (!wordId) return;
          const echoed = ROOM[wordId];
          set({ trial: { source: "echo", wordId, hint: false, picked: null }, review: null });
          append([
            {
              kind: "you",
              text: `Escuchar un eco \u00b7 ${echoed.word}`,
              gloss: `Hear an echo \u00b7 ${echoed.gloss}`,
            },
          ]);
        },

        startReview: () => {
          const state = get();
          const room = ROOM[state.roomId];
          if (!room?.review || state.trial) return;
          const ids = sampleReview(room.level, state.words);
          if (ids.length < 3) {
            const silent = silentRooms(room.level, state.words);
            append([
              {
                kind: "system",
                text: silent.length
                  ? `Hacen falta tres palabras conocidas. A\u00fan callan: ${silent.join(", ")}.`
                  : "Hacen falta tres palabras conocidas antes del repaso.",
                gloss: silent.length
                  ? `Three known words are needed. Still silent: ${silent.join(", ")}.`
                  : "Three known words are needed before the review.",
              },
            ]);
            return;
          }
          set({
            review: { ids, step: 0, correct: 0, finished: false },
            trial: { source: "review", wordId: ids[0], hint: false, picked: null },
          });
          append([
            {
              kind: "you",
              text: "Hacer el repaso",
              gloss: "Begin the review",
            },
          ]);
        },

        showHint: () => {
          const trial = get().trial;
          if (!trial || trial.picked !== null) return;
          set({ trial: { ...trial, hint: true } });
        },

        answer: (index) => {
          const state = get();
          const trial = state.trial;
          if (!trial || trial.picked !== null) return;
          const spec = resolveTrial(trial);
          const option = spec.options[index];
          if (!option) return;
          const prev = state.words[trial.wordId] ?? blankWord();
          let status = prev.status;
          if (option.correct && trial.source === "discover") {
            if (status !== "firm") status = "known";
          } else if (option.correct) {
            status = "firm";
          }
          const knownAt = prev.knownAt || (status === "known" || status === "firm" ? Date.now() : 0);
          const words = {
            ...state.words,
            [trial.wordId]: {
              status,
              correct: prev.correct + (option.correct ? 1 : 0),
              wrong: prev.wrong + (option.correct ? 0 : 1),
              knownAt,
            },
          };
          const becameKnown =
            option.correct && trial.source === "discover" && prev.status !== "known" && prev.status !== "firm";
          const becameFirm = option.correct && trial.source !== "discover" && prev.status !== "firm";
          const lines: Omit<LogLine, "id">[] = [
            {
              kind: option.correct ? "good" : "bad",
              text: option.feedback,
              gloss: option.feedbackGloss,
            },
          ];
          const word = ROOM[trial.wordId];
          if (becameKnown) {
            lines.push({
              kind: "system",
              text: `Anotas \u00ab${word.word}\u00bb en el cuaderno. Las puertas de este cuarto se abren.`,
              gloss: `You enter \u201c${word.word}\u201d in the phrasebook. The doors of this room open.`,
            });
            const stats = levelStats(word.level, words);
            if (stats.known === stats.total) {
              const name = districtOf(word.level).name;
              lines.push({
                kind: "system",
                text: `Todos los cuartos de ${name} tienen nombre. El repaso puede sellarlos.`,
                gloss: `Every room in ${name} has its name. A review can seal them.`,
              });
            }
          } else if (option.correct && trial.source === "discover") {
            lines.push({
              kind: "system",
              text: "La palabra ya era tuya. Sigue en el cuaderno.",
              gloss: "The word was already yours. It stays in the phrasebook.",
            });
          }
          if (becameFirm) {
            lines.push({
              kind: "system",
              text: `El eco se queda. \u00ab${word.word}\u00bb queda retenida.`,
              gloss: `The echo holds. \u201c${word.word}\u201d is retained.`,
            });
          } else if (!option.correct && trial.source !== "discover") {
            lines.push({
              kind: "system",
              text: "El eco se deshace. La palabra sigue conocida; a\u00fan no est\u00e1 retenida.",
              gloss: "The echo frays. The word stays known; it is not retained yet.",
            });
          }
          if (becameKnown && word.id === "c2-ultima") {
            const named = cityNamed(words);
            lines.push({
              kind: "narration",
              text: named
                ? "Has puesto nombre a cada distrito. La ciudad habla seguida, del umbral a la biblioteca."
                : "Esta sala ya responde. Otros distritos siguen en silencio, si quieres volver a ellos.",
              gloss: named
                ? "You have named every district. The city speaks in one piece, from the threshold to the library."
                : "This room answers now. Other districts are still silent, if you want to go back.",
            });
          }
          set((current) => {
            let seq = current.logSeq;
            const log = [...current.log];
            for (const line of lines) {
              seq += 1;
              log.push({ ...line, id: seq });
            }
            return {
              words,
              trial: { ...trial, picked: index },
              log: log.slice(-48),
              logSeq: seq,
            };
          });
          if (state.sound) playChime(Boolean(option.correct));
        },

        continueTrial: () => {
          const state = get();
          const trial = state.trial;
          if (!trial || trial.picked === null) return;
          const spec = resolveTrial(trial);
          const correct = Boolean(spec.options[trial.picked]?.correct);
          if (trial.source === "review" && state.review) {
            const step = state.review.step + 1;
            const tally = state.review.correct + (correct ? 1 : 0);
            if (step >= state.review.ids.length) {
              const level = ROOM[state.roomId].level;
              const perfect = tally === state.review.ids.length;
              const sealed =
                perfect && !state.sealed.includes(level) ? [...state.sealed, level] : state.sealed;
              set({
                trial: null,
                review: { ...state.review, step, correct: tally, finished: true },
                sealed,
              });
              append([
                perfect
                  ? {
                      kind: "system",
                      text: "Tres de tres. El distrito queda sellado. Hay una nota nueva de Mateo.",
                      gloss: "Three of three. The district is sealed. There is a new note from Mateo.",
                    }
                  : {
                      kind: "system",
                      text: `${tally} de ${state.review.ids.length}. Nada se borra: puedes volver a intentar el repaso.`,
                      gloss: `${tally} of ${state.review.ids.length}. Nothing is erased: you can try the review again.`,
                    },
              ]);
              return;
            }
            set({
              review: { ...state.review, step, correct: tally, finished: false },
              trial: { source: "review", wordId: state.review.ids[step], hint: false, picked: null },
            });
            return;
          }
          set({ trial: null });
        },

        setPanel: (panel) => set({ panel }),
        toggleEnglish: () => set((state) => ({ showEnglish: !state.showEnglish })),
        toggleSound: () => set((state) => ({ sound: !state.sound })),
        dismissCoach: () => set({ coached: true }),
        reset: () =>
          set({
            ...empty,
            hydrated: true,
            panel: null,
            log: [],
            logSeq: 0,
            trial: null,
            review: null,
          }),
      };
    },
    {
      name: "senda-v1",
      skipHydration: true,
      storage: createJSONStorage(() => (typeof window === "undefined" ? memoryStorage() : localStorage)),
      partialize: (state) => ({
        phase: state.phase,
        level: state.level,
        roomId: state.roomId,
        visited: state.visited,
        lastRoom: state.lastRoom,
        words: state.words,
        sealed: state.sealed,
        showEnglish: state.showEnglish,
        sound: state.sound,
        coached: state.coached,
      }),
    },
  ),
);

export function echoAvailable(state: Pick<State, "roomId" | "words" | "trial">): string | null {
  const room = ROOM[state.roomId];
  if (!room || room.review || state.trial || !isMastered(state.words, room.id)) return null;
  return pickEcho(state.words, room.id, room.level);
}
