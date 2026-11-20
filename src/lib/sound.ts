/**
 * High-performance Web Audio API synthesizer for tactile UI sound effects.
 * 100% code-synthesized: zero external audio assets, zero latency, zero 404s.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Initialize sound preference from localStorage
try {
  const stored = localStorage.getItem('portfolio-sound');
  if (stored !== null) {
    soundEnabled = stored === 'true';
  }
} catch {
  soundEnabled = true;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem('portfolio-sound', String(soundEnabled));
  } catch {
    /* ignore */
  }
  if (soundEnabled) {
    playChime(640, 0.08, 'sine');
  }
  return soundEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
  return audioCtx;
}

/** Soft click for buttons / tabs */
export function playClick(freq = 800, duration = 0.04) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* audio blocked */
  }
}

/** Subtle hover tick */
export function playHover() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  } catch {
    /* ignore */
  }
}

/** Pull cord stretching sound: mechanical tactile clicks */
export function playCordStretch(intensity = 1) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    const baseFreq = 160 + intensity * 80;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, ctx.currentTime + 0.03);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    gain.gain.setValueAtTime(0.035 * Math.min(1, intensity), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch {
    /* ignore */
  }
}

/** Theme switch release: cinematic light switch "snap" + harmonic chime */
export function playCordSnap(isDark: boolean) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Mechanical switch click
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);

    // 2. Resonant warm lamp or power hum
    const hum = ctx.createOscillator();
    const humGain = ctx.createGain();
    hum.type = 'sine';
    const targetFreq = isDark ? 220 : 520;
    hum.frequency.setValueAtTime(targetFreq * 0.7, now + 0.02);
    hum.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.28);

    humGain.gain.setValueAtTime(0.001, now);
    humGain.gain.linearRampToValueAtTime(0.06, now + 0.05);
    humGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    hum.connect(humGain);
    humGain.connect(ctx.destination);
    hum.start(now + 0.02);
    hum.stop(now + 0.45);
  } catch {
    /* ignore */
  }
}

/** Musical chime for successes / modals */
export function playChime(freq = 587.33, duration = 0.3, type: OscillatorType = 'sine') {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* ignore */
  }
}
