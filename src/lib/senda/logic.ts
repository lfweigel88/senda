import type { ActiveTrial, WordState } from "./store-types";
import { ROOM, districtOf, learningRooms, roomsIn } from "./world";
import type { Cefr, Trial } from "./types";

export function isMastered(words: Record<string, WordState>, id: string): boolean {
  const status = words[id]?.status;
  return status === "known" || status === "firm";
}

export function levelStats(level: Cefr, words: Record<string, WordState>) {
  const learn = learningRooms(level);
  let known = 0;
  let firm = 0;
  for (const room of learn) {
    const status = words[room.id]?.status;
    if (status === "known" || status === "firm") known += 1;
    if (status === "firm") firm += 1;
  }
  return { total: learn.length, known, firm };
}

export function cityStats(words: Record<string, WordState>) {
  let known = 0;
  let firm = 0;
  let total = 0;
  for (const room of Object.values(ROOM)) {
    if (room.review) continue;
    total += 1;
    const status = words[room.id]?.status;
    if (status === "known" || status === "firm") known += 1;
    if (status === "firm") firm += 1;
  }
  return { total, known, firm };
}

export function unlockedRooms(
  level: Cefr,
  words: Record<string, WordState>,
  visited: string[],
): Set<string> {
  const rooms = roomsIn(level);
  const start = districtOf(level).start;
  const open = new Set<string>([start]);
  for (const id of visited) {
    const room = ROOM[id];
    if (room?.level === level) open.add(id);
  }
  let guard = 0;
  let changed = true;
  while (changed && guard < 24) {
    changed = false;
    guard += 1;
    for (const room of rooms) {
      if (!open.has(room.id)) continue;
      const pass = Boolean(room.review) || isMastered(words, room.id);
      if (!pass) continue;
      for (const exit of room.exits) {
        if (!open.has(exit.to)) {
          open.add(exit.to);
          changed = true;
        }
      }
    }
  }
  return open;
}

export function resolveTrial(trial: ActiveTrial): Trial {
  const room = ROOM[trial.wordId];
  if (!room) throw new Error("missing word room");
  if (trial.source === "discover") {
    const action = room.actions.find((item) => item.trial);
    if (!action?.trial) throw new Error("missing discovery");
    return action.trial;
  }
  if (!room.recall) throw new Error("missing recall");
  return room.recall;
}

export function pickEcho(
  words: Record<string, WordState>,
  currentId: string,
  level: Cefr,
): string | null {
  const known = Object.values(ROOM).filter(
    (room) => !room.review && room.id !== currentId && words[room.id]?.status === "known",
  );
  if (!known.length) return null;
  const same = known.filter((room) => room.level === level);
  const pool = same.length ? same : known;
  pool.sort((a, b) => (words[a.id]?.knownAt ?? 0) - (words[b.id]?.knownAt ?? 0));
  return pool[0].id;
}

export function sampleReview(level: Cefr, words: Record<string, WordState>): string[] {
  const pool = learningRooms(level).filter((room) => isMastered(words, room.id));
  const fresh = shuffle(pool.filter((room) => words[room.id]?.status === "known"));
  const firm = shuffle(pool.filter((room) => words[room.id]?.status === "firm"));
  return [...fresh, ...firm].slice(0, 3).map((room) => room.id);
}

export function silentRooms(level: Cefr, words: Record<string, WordState>): string[] {
  return learningRooms(level)
    .filter((room) => !isMastered(words, room.id))
    .map((room) => room.place);
}

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

export function cityNamed(words: Record<string, WordState>): boolean {
  return Object.values(ROOM)
    .filter((room) => !room.review)
    .every((room) => isMastered(words, room.id));
}
