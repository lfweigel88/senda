import { A1 } from "./a1";
import { A2 } from "./a2";
import { B1 } from "./b1";
import { B2 } from "./b2";
import { C1 } from "./c1";
import { C2 } from "./c2";
import type { Cefr, District, Room } from "./types";

export const DISTRICTS: District[] = [
  {
    level: "A1",
    name: "El Umbral",
    epithet: "The threshold",
    blurb: "Greetings, hunger, prices, where things are.",
    start: "a1-patio",
  },
  {
    level: "A2",
    name: "La Ciudad Baja",
    epithet: "The lower city",
    blurb: "Yesterday, the pretérito, weather, comparisons.",
    start: "a2-estacion",
  },
  {
    level: "B1",
    name: "El Barrio",
    epithet: "The neighborhood",
    blurb: "Purpose, opinion, aches, plans, although.",
    start: "b1-libreria",
  },
  {
    level: "B2",
    name: "La Plaza Mayor",
    epithet: "The main square",
    blurb: "Wishes, doubt, contrast, unreal ifs.",
    start: "b2-plaza",
  },
  {
    level: "C1",
    name: "El Ateneo",
    epithet: "The athenaeum",
    blurb: "Register, nuance, limits, irony.",
    start: "c1-ateneo",
  },
  {
    level: "C2",
    name: "La Biblioteca Oscura",
    epithet: "The dark library",
    blurb: "Glimpse, counterfactual past, the unsayable.",
    start: "c2-tinta",
  },
];

export const ROOMS: Room[] = [...A1, ...A2, ...B1, ...B2, ...C1, ...C2];

export const ROOM: Record<string, Room> = Object.fromEntries(ROOMS.map((room) => [room.id, room]));

export const LEVELS: Cefr[] = DISTRICTS.map((d) => d.level);

export function districtOf(level: Cefr): District {
  const found = DISTRICTS.find((d) => d.level === level);
  if (!found) throw new Error(`missing district ${level}`);
  return found;
}

export function roomsIn(level: Cefr): Room[] {
  return ROOMS.filter((room) => room.level === level);
}

export function learningRooms(level: Cefr): Room[] {
  return roomsIn(level).filter((room) => !room.review);
}

function problems(): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const room of ROOMS) {
    if (ids.has(room.id)) issues.push(`duplicate ${room.id}`);
    ids.add(room.id);
    if (!room.scene || !room.word || !room.grammar) issues.push(`empty copy ${room.id}`);
    const trials = room.actions.filter((action) => action.trial);
    if (room.review) {
      if (trials.length) issues.push(`review has trial ${room.id}`);
      if (room.recall) issues.push(`review has recall ${room.id}`);
    } else {
      if (trials.length !== 1) issues.push(`trial count ${room.id}: ${trials.length}`);
      if (!room.recall) issues.push(`missing recall ${room.id}`);
      if (room.scrap == null) issues.push(`missing scrap ${room.id}`);
    }
    for (const action of room.actions) {
      const trial = action.trial;
      if (!trial) continue;
      checkTrial(issues, `${room.id}:${action.id}`, trial);
      if (room.recall && trial.prompt === room.recall.prompt) {
        issues.push(`recall copies discovery ${room.id}`);
      }
    }
    if (room.recall) checkTrial(issues, `${room.id}:recall`, room.recall);
    for (const exit of room.exits) {
      const dest = ROOM[exit.to];
      if (!dest) issues.push(`bad exit ${room.id} -> ${exit.to}`);
      else if (dest.level !== room.level) issues.push(`cross level ${room.id} -> ${exit.to}`);
    }
  }
  for (const district of DISTRICTS) {
    const start = ROOM[district.start];
    if (!start || start.level !== district.level) issues.push(`bad start ${district.level}`);
    const open = new Set<string>([district.start]);
    const queue = [district.start];
    while (queue.length) {
      const id = queue.pop()!;
      for (const exit of ROOM[id].exits) {
        if (!open.has(exit.to)) {
          open.add(exit.to);
          queue.push(exit.to);
        }
      }
    }
    for (const room of roomsIn(district.level)) {
      if (!open.has(room.id)) issues.push(`unreachable ${room.id}`);
    }
    const back = new Set<string>();
    const stack = roomsIn(district.level).map((room) => room.id);
    const reverse = new Map<string, string[]>();
    for (const room of roomsIn(district.level)) {
      for (const exit of room.exits) {
        const list = reverse.get(exit.to) ?? [];
        list.push(room.id);
        reverse.set(exit.to, list);
      }
    }
    const backQueue = [district.start];
    back.add(district.start);
    while (backQueue.length) {
      const id = backQueue.pop()!;
      for (const from of reverse.get(id) ?? []) {
        if (!back.has(from)) {
          back.add(from);
          backQueue.push(from);
        }
      }
    }
    for (const id of stack) {
      if (!back.has(id)) issues.push(`no way back ${id}`);
    }
  }
  return issues;
}

function checkTrial(
  issues: string[],
  label: string,
  trial: { options: { correct?: boolean }[]; prompt: string; hint: string },
) {
  const correct = trial.options.filter((option) => option.correct);
  if (correct.length !== 1) issues.push(`correct count ${label}: ${correct.length}`);
  if (trial.options.length < 3) issues.push(`too few options ${label}`);
  if (!trial.prompt || !trial.hint) issues.push(`empty trial ${label}`);
}

const issues = problems();
if (issues.length) {
  throw new Error(`Senda world\n${issues.join("\n")}`);
}
