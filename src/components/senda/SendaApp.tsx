import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  Languages,
  Lock,
  Map as MapIcon,
  ScrollText,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { echoAvailable, useSenda } from "@/lib/senda/store";
import { cityStats, isMastered, levelStats, resolveTrial, unlockedRooms } from "@/lib/senda/logic";
import { DISTRICTS, ROOM, districtOf, roomsIn } from "@/lib/senda/world";
import type { Cefr, Room } from "@/lib/senda/types";
import type { WordState } from "@/lib/senda/store-types";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MASTERY: Record<WordState["status"], string> = {
  glimpsed: "seen",
  known: "known",
  firm: "retained",
};

export function SendaApp() {
  const hydrated = useSenda((state) => state.hydrated);
  const phase = useSenda((state) => state.phase);

  useEffect(() => {
    void Promise.resolve(useSenda.persist.rehydrate()).finally(() => {
      useSenda.setState({ hydrated: true });
    });
  }, []);

  if (!hydrated || phase === "title") return <Title />;
  return <Play />;
}

function Title() {
  const roomId = useSenda((state) => state.roomId);
  const words = useSenda((state) => state.words);
  const sealed = useSenda((state) => state.sealed);
  const goLevel = useSenda((state) => state.goLevel);
  const resume = useSenda((state) => state.resume);
  const reset = useSenda((state) => state.reset);
  const [confirm, setConfirm] = useState(false);
  const room = ROOM[roomId];
  const stats = cityStats(words);
  const canResume = Boolean(room);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
      <p className="font-sans text-xs font-medium tracking-widest text-primary uppercase">A city of Spanish words</p>
      <h1 className="mt-3 font-serif text-5xl font-medium text-balance italic text-fg sm:text-6xl">Senda</h1>
      <div className="mt-6 h-px w-16 bg-primary" />
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-pretty text-fg">
        Every room is a word. Read it, choose a command, and use the word. A right answer opens the doors.
        Later the city asks again — that second time is what makes a word stay.
      </p>
      <ul className="mt-4 max-w-prose space-y-1 font-sans text-sm leading-relaxed text-muted">
        <li>Start at any level, from A1 to C2. Nothing is locked between districts.</li>
        <li>Keys 1–9 choose a command. English glosses can be hidden.</li>
        <li>The phrasebook stays on this device.</li>
      </ul>

      {canResume && room ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={resume}
            className="min-h-11 rounded-md bg-primary px-5 font-sans text-base font-medium text-bg"
          >
            Continue · {room.place}
          </button>
          <p className="font-sans text-sm text-muted tabular-nums">
            {stats.known}/{stats.total} known · {stats.firm} retained
            {sealed.length ? ` · ${sealed.length} sealed` : ""}
          </p>
        </div>
      ) : null}

      <ol className="mt-10 divide-y divide-muted/20 border-y border-muted/20">
        {DISTRICTS.map((district) => {
          const progress = levelStats(district.level, words);
          const done = sealed.includes(district.level);
          return (
            <li key={district.level}>
              <button
                type="button"
                onClick={() => goLevel(district.level)}
                className="flex w-full min-h-11 flex-col gap-1 py-4 text-left hover:bg-surface sm:flex-row sm:items-baseline sm:gap-6 sm:px-2"
              >
                <span className="w-10 shrink-0 font-sans text-sm font-medium text-primary">{district.level}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-2xl text-fg">{district.name}</span>
                  <span className="mt-1 block font-sans text-sm text-muted">
                    {district.epithet}. {district.blurb}
                  </span>
                </span>
                <span className="font-sans text-sm text-muted tabular-nums">
                  {done ? "Sealed" : progress.known ? `${progress.known}/${progress.total}` : "Enter"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {stats.known > 0 ? (
        <div className="mt-8">
          {confirm ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-md border border-primary px-4 font-sans text-sm text-primary"
              >
                Erase the phrasebook
              </button>
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="min-h-11 rounded-md px-4 font-sans text-sm text-muted"
              >
                Keep it
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="min-h-11 font-sans text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              Start a new journey
            </button>
          )}
        </div>
      ) : null}
    </main>
  );
}

function Play() {
  const roomId = useSenda((state) => state.roomId);
  const level = useSenda((state) => state.level);
  const words = useSenda((state) => state.words);
  const visited = useSenda((state) => state.visited);
  const showEnglish = useSenda((state) => state.showEnglish);
  const sound = useSenda((state) => state.sound);
  const panel = useSenda((state) => state.panel);
  const log = useSenda((state) => state.log);
  const trial = useSenda((state) => state.trial);
  const review = useSenda((state) => state.review);
  const coached = useSenda((state) => state.coached);
  const sealed = useSenda((state) => state.sealed);
  const setPanel = useSenda((state) => state.setPanel);
  const toggleEnglish = useSenda((state) => state.toggleEnglish);
  const toggleSound = useSenda((state) => state.toggleSound);
  const dismissCoach = useSenda((state) => state.dismissCoach);
  const doAction = useSenda((state) => state.doAction);
  const tryExit = useSenda((state) => state.tryExit);
  const hearEcho = useSenda((state) => state.hearEcho);
  const startReview = useSenda((state) => state.startReview);
  const showHint = useSenda((state) => state.showHint);
  const answer = useSenda((state) => state.answer);
  const continueTrial = useSenda((state) => state.continueTrial);
  const bottomRef = useRef<HTMLDivElement>(null);

  const room = ROOM[roomId];
  const district = districtOf(level);
  const open = useMemo(() => unlockedRooms(level, words, visited), [level, words, visited]);
  const stats = levelStats(level, words);
  const echoId = echoAvailable({ roomId, words, trial });

  const commands = useMemo(() => {
    if (!room) return [];
    if (trial && trial.picked === null) {
      const spec = resolveTrial(trial);
      return spec.options.map((option, index) => ({
        id: `opt-${index}`,
        label: option.text,
        gloss: undefined as string | undefined,
        locked: false,
        run: () => answer(index),
      }));
    }
    if (trial && trial.picked !== null) {
      return [
        {
          id: "continue",
          label: "Continuar",
          gloss: "Continue",
          locked: false,
          run: continueTrial,
        },
      ];
    }
    const list: {
      id: string;
      label: string;
      gloss?: string;
      locked: boolean;
      run: () => void;
    }[] = room.actions.map((action) => ({
      id: action.id,
      label: action.label,
      gloss: action.labelGloss,
      locked: false,
      run: () => doAction(action.id),
    }));
    if (room.review && !review?.finished) {
      list.push({
        id: "review",
        label: "Hacer el repaso",
        gloss: "Begin the review",
        locked: false,
        run: startReview,
      });
    }
    if (review?.finished) {
      list.push({
        id: "again",
        label: "Repasar otra vez",
        gloss: "Review again",
        locked: false,
        run: startReview,
      });
    }
    if (echoId) {
      const echoed = ROOM[echoId];
      list.push({
        id: "echo",
        label: `Eco · ${echoed.word}`,
        gloss: `Recall · ${echoed.gloss}`,
        locked: false,
        run: hearEcho,
      });
    }
    for (const exit of room.exits) {
      const locked = !open.has(exit.to);
      list.push({
        id: exit.to,
        label: `${exit.dir} · ${exit.label}`,
        gloss: `${exit.dir} · ${exit.labelGloss}`,
        locked,
        run: () => tryExit(exit.to),
      });
    }
    return list;
  }, [
    room,
    trial,
    review?.finished,
    echoId,
    open,
    answer,
    continueTrial,
    doAction,
    startReview,
    hearEcho,
    tryExit,
  ]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      const index = Number(event.key) - 1;
      if (!Number.isInteger(index) || index < 0 || index >= commands.length) return;
      event.preventDefault();
      commands[index]?.run();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commands]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bottomRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [log.length, trial?.picked, trial?.wordId, roomId, review?.step]);

  if (!room) {
    return (
      <main className="grid min-h-dvh place-items-center bg-bg px-6 text-center">
        <div>
          <p className="font-serif text-2xl italic">This room has gone quiet.</p>
          <button
            type="button"
            onClick={() => useSenda.setState({ phase: "title" })}
            className="mt-4 min-h-11 font-sans text-sm text-primary"
          >
            Back to the districts
          </button>
        </div>
      </main>
    );
  }

  const wordState = words[room.id];
  const spec = trial ? resolveTrial(trial) : null;
  const quizzed = trial ? ROOM[trial.wordId] : null;
  const showCoach = !coached && room.id === district.start && !isMastered(words, room.id);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-muted/20 bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <button type="button" onClick={() => useSenda.setState({ phase: "title" })} className="min-h-11 font-sans text-sm font-medium tracking-widest text-primary uppercase">
            Senda
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-lg text-fg">
              <span className="font-sans text-xs text-primary">{level}</span> {district.name}
            </p>
            <p className="font-sans text-xs text-muted tabular-nums">
              {stats.known}/{stats.total} known · {stats.firm} retained
              {sealed.includes(level) ? " · sealed" : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            <IconButton
              label="Words"
              pressed={panel === "words"}
              onClick={() => setPanel(panel === "words" ? null : "words")}
            >
              <BookOpen className="size-4" aria-hidden />
            </IconButton>
            <IconButton label="Map" pressed={panel === "map"} onClick={() => setPanel(panel === "map" ? null : "map")}>
              <MapIcon className="size-4" aria-hidden />
            </IconButton>
            <IconButton
              label="Notes"
              pressed={panel === "notes"}
              onClick={() => setPanel(panel === "notes" ? null : "notes")}
            >
              <ScrollText className="size-4" aria-hidden />
            </IconButton>
            <IconButton label={showEnglish ? "Hide English" : "Show English"} pressed={showEnglish} onClick={toggleEnglish}>
              <Languages className="size-4" aria-hidden />
            </IconButton>
            <IconButton label={sound ? "Mute" : "Sound"} pressed={sound} onClick={toggleSound}>
              {sound ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
            </IconButton>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="min-w-0 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-prose">
            <p className="font-sans text-xs tracking-widest text-muted uppercase">{room.placeGloss}</p>
            <h1 className="mt-1 font-serif text-4xl text-balance italic text-fg">{room.place}</h1>
            {!room.review ? (
              <div className="mt-4">
                <p className="font-serif text-xl text-primary">{room.word}</p>
                <p className="font-sans text-sm text-muted">
                  {room.gloss} · {room.pos}
                  {wordState ? ` · ${MASTERY[wordState.status]}` : ""}
                </p>
              </div>
            ) : (
              <p className="mt-4 font-sans text-sm text-muted">Review · no new word</p>
            )}
            <p lang="es" className="mt-6 text-lg leading-relaxed text-pretty text-fg">
              {room.scene}
            </p>
            {showEnglish ? <p className="mt-3 text-base leading-relaxed text-pretty text-muted">{room.sceneGloss}</p> : null}

            {showCoach ? (
              <div className="mt-6 rounded-md border border-muted/25 bg-surface p-4">
                <p className="text-base leading-relaxed text-fg">
                  One command teaches the word of this room. A locked door waits until that word is yours. Echoes
                  and the review room ask again later.
                </p>
                <button type="button" onClick={dismissCoach} className="mt-3 min-h-11 font-sans text-sm text-primary">
                  Understood
                </button>
              </div>
            ) : null}

            <div className="mt-8 space-y-4" aria-live="polite">
              {log.map((line) => (
                <p
                  key={line.id}
                  className={cn(
                    "rise text-base leading-relaxed text-pretty",
                    line.kind === "you" && "font-sans text-sm text-muted",
                    line.kind === "good" && "text-primary",
                    line.kind === "bad" && "text-fg",
                    line.kind === "system" && "font-sans text-sm text-primary",
                    line.kind === "narration" && "text-fg",
                  )}
                >
                  {line.kind === "you" ? `> ${line.text}` : line.text}
                  {showEnglish && line.gloss ? (
                    <span className="mt-1 block text-sm text-muted">{line.gloss}</span>
                  ) : null}
                </p>
              ))}
            </div>

            {spec && quizzed ? (
              <section className="mt-8 rounded-md border border-muted/25 bg-surface p-4 sm:p-5">
                <p className="font-sans text-xs tracking-widest text-primary uppercase">
                  {trial?.source === "discover" ? "The word" : trial?.source === "echo" ? "Echo" : `Review ${review ? review.step + 1 : 1} / 3`}
                  {trial?.source !== "discover" ? ` · ${quizzed.word}` : ""}
                </p>
                <p lang="es" className="mt-3 text-lg leading-relaxed text-pretty text-fg">
                  {spec.prompt}
                </p>
                {showEnglish ? <p className="mt-2 text-sm leading-relaxed text-muted">{spec.promptGloss}</p> : null}
                {trial?.hint ? (
                  <p className="mt-3 border-l-2 border-primary pl-3 text-sm leading-relaxed text-muted">
                    <span lang="es">{spec.hint}</span>
                    {showEnglish ? <span className="mt-1 block">{spec.hintGloss}</span> : null}
                  </p>
                ) : trial?.picked === null ? (
                  <button type="button" onClick={showHint} className="mt-3 min-h-11 font-sans text-sm text-muted">
                    Pista
                  </button>
                ) : null}
                {trial?.picked !== null ? (
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted">{quizzed.grammar}</p>
                ) : null}
              </section>
            ) : null}

            <h2 className="mt-8 font-serif text-lg italic text-fg">¿Qué haces?</h2>
            <div className="mt-3 space-y-2">
              {commands.map((command, index) => (
                <button
                  key={command.id}
                  type="button"
                  onClick={command.run}
                  className={cn(
                    "flex w-full min-h-11 items-start gap-3 rounded-md border px-3 py-3 text-left",
                    command.locked
                      ? "border-muted/15 text-muted"
                      : "border-muted/25 bg-surface text-fg hover:border-primary",
                  )}
                >
                  <span className="w-5 shrink-0 pt-0.5 font-sans text-sm text-primary tabular-nums">{index + 1}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-sans text-base">
                      {command.locked ? <Lock className="size-4 shrink-0" aria-hidden /> : null}
                      <span lang="es">{command.label}</span>
                    </span>
                    {showEnglish && command.gloss ? (
                      <span className="mt-1 block font-sans text-sm text-muted">{command.gloss}</span>
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
            <div ref={bottomRef} />
          </div>
        </article>

        {panel ? (
          <aside className="hidden min-w-0 border-l border-muted/20 px-5 py-6 lg:block">
            <PanelBody panel={panel} onClose={() => setPanel(null)} />
          </aside>
        ) : (
          <div className="hidden lg:block" />
        )}
      </div>

      {panel ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close panel"
            className="fixed inset-0 z-30 bg-bg/70"
            onClick={() => setPanel(null)}
          />
          <div className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-muted/20 bg-bg px-4 py-4">
            <PanelBody panel={panel} onClose={() => setPanel(null)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function IconButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 font-sans text-sm"
    >
      <span className={cn(pressed ? "text-primary" : "text-muted")}>{children}</span>
      <span className={cn("hidden sm:inline", pressed ? "text-primary" : "text-muted")}>{label}</span>
    </button>
  );
}

function PanelBody({ panel, onClose }: { panel: "words" | "map" | "notes"; onClose: () => void }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-2xl italic text-fg">
          {panel === "words" ? "Cuaderno" : panel === "map" ? "Mapa" : "Notas"}
        </h2>
        <button type="button" onClick={onClose} aria-label="Close" className="grid size-11 place-items-center text-muted">
          <X className="size-5" />
        </button>
      </div>
      {panel === "words" ? <Lexicon /> : null}
      {panel === "map" ? <DistrictMap /> : null}
      {panel === "notes" ? <Notes /> : null}
    </div>
  );
}

function Lexicon() {
  const words = useSenda((state) => state.words);
  const showEnglish = useSenda((state) => state.showEnglish);
  const [filter, setFilter] = useState<Cefr | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const entries = Object.values(ROOM).filter((room) => !room.review && words[room.id] && (filter === "all" || room.level === filter));

  return (
    <div>
      <p className="font-sans text-sm leading-relaxed text-muted">
        Known means the room’s door opened. Retained means you recalled the word later, away from that room.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(["all", "A1", "A2", "B1", "B2", "C1", "C2"] as const).map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setFilter(level)}
            className={cn(
              "min-h-11 rounded-md px-3 font-sans text-sm",
              filter === level ? "bg-primary text-bg" : "text-muted",
            )}
          >
            {level === "all" ? "All" : level}
          </button>
        ))}
      </div>
      {entries.length === 0 ? (
        <p className="mt-6 font-sans text-sm text-muted">No words yet. The first room is waiting.</p>
      ) : (
        <ul className="mt-4 divide-y divide-muted/20">
          {entries.map((room) => {
            const state = words[room.id];
            const open = openId === room.id;
            return (
              <li key={room.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : room.id)}
                  className="flex w-full min-h-11 items-baseline gap-3 py-3 text-left"
                >
                  <span className="w-8 shrink-0 font-sans text-xs text-primary">{room.level}</span>
                  <span className="min-w-0 flex-1">
                    <span lang="es" className="block font-serif text-lg text-fg">
                      {room.word}
                    </span>
                    <span className="block font-sans text-sm text-muted">{room.gloss}</span>
                  </span>
                  <span className="font-sans text-xs text-primary">{state ? MASTERY[state.status] : ""}</span>
                </button>
                {open ? <WordCard room={room} showEnglish={showEnglish} /> : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function WordCard({ room, showEnglish }: { room: Room; showEnglish: boolean }) {
  return (
    <div className="pb-4 pl-11">
      <p className="font-sans text-sm text-muted">{room.pos}</p>
      <p lang="es" className="mt-2 text-base leading-relaxed text-fg">
        {room.example}
      </p>
      {showEnglish ? <p className="mt-1 text-sm text-muted">{room.exampleGloss}</p> : null}
      <p className="mt-3 text-sm leading-relaxed text-muted">{room.grammar}</p>
    </div>
  );
}

function DistrictMap() {
  const level = useSenda((state) => state.level);
  const roomId = useSenda((state) => state.roomId);
  const words = useSenda((state) => state.words);
  const visited = useSenda((state) => state.visited);
  const goLevel = useSenda((state) => state.goLevel);
  const enterRoom = useSenda((state) => state.enterRoom);
  const setPanel = useSenda((state) => state.setPanel);
  const open = unlockedRooms(level, words, visited);
  const rooms = roomsIn(level);

  return (
    <div>
      <ul className="space-y-1">
        {rooms.map((room) => {
          const unlocked = open.has(room.id);
          const current = room.id === roomId;
          const seen = visited.includes(room.id);
          const state = words[room.id];
          return (
            <li key={room.id}>
              <button
                type="button"
                disabled={!unlocked || current}
                onClick={() => {
                  enterRoom(room.id);
                  setPanel(null);
                }}
                className={cn(
                  "flex w-full min-h-11 items-center gap-3 rounded-md px-2 py-2 text-left",
                  current && "bg-surface",
                  !unlocked && "text-muted",
                )}
              >
                {!unlocked ? <Lock className="size-4 shrink-0" aria-hidden /> : <span className="w-4" />}
                <span className="min-w-0 flex-1">
                  <span lang="es" className="block font-serif text-lg">
                    {room.place}
                  </span>
                  <span className="block font-sans text-xs text-muted">
                    {room.review ? "review" : seen ? room.word : "···"}
                    {state ? ` · ${MASTERY[state.status]}` : ""}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 border-t border-muted/20 pt-4">
        <p className="font-sans text-xs tracking-widest text-muted uppercase">Districts</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DISTRICTS.map((district) => (
            <button
              key={district.level}
              type="button"
              onClick={() => goLevel(district.level)}
              className={cn(
                "min-h-11 rounded-md px-3 font-sans text-sm",
                district.level === level ? "bg-primary text-bg" : "text-muted",
              )}
            >
              {district.level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Notes() {
  const words = useSenda((state) => state.words);
  const sealed = useSenda((state) => state.sealed);
  const showEnglish = useSenda((state) => state.showEnglish);
  const notes = Object.values(ROOM).filter((room) => {
    if (!room.scrap) return false;
    if (room.review) return sealed.includes(room.level);
    return isMastered(words, room.id);
  });

  if (!notes.length) {
    return <p className="font-sans text-sm leading-relaxed text-muted">Mateo’s notes appear when a word is yours.</p>;
  }

  return (
    <ul className="space-y-5">
      {notes.map((room) => (
        <li key={room.id} className="border-l-2 border-primary pl-3">
          <p className="font-sans text-xs text-primary">
            {room.level} · {room.place}
          </p>
          <p lang="es" className="mt-1 text-base leading-relaxed text-pretty text-fg">
            {room.scrap}
          </p>
          {showEnglish ? <p className="mt-1 text-sm leading-relaxed text-muted">{room.scrapGloss}</p> : null}
        </li>
      ))}
    </ul>
  );
}
