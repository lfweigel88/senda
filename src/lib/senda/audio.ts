let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(at: number, freq: number, dur: number, audio: AudioContext) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(0.045, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(at);
  osc.stop(at + dur + 0.02);
}

export function playChime(ok: boolean) {
  const audio = context();
  if (!audio) return;
  const now = audio.currentTime;
  if (ok) {
    tone(now, 523.25, 0.18, audio);
    tone(now + 0.09, 659.25, 0.22, audio);
  } else {
    tone(now, 196, 0.16, audio);
  }
}
