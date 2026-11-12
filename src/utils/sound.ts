/**
 * Synthesizes a cinematic Netflix-inspired "Ta-dum" (tudun) orchestral + sub-bass intro sound
 * using the Web Audio API — zero external audio files required.
 */

let sharedCtx: AudioContext | null = null;
let hasPlayedThisMount = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    sharedCtx = new Ctx({ latencyHint: 'interactive' });
  }
  return sharedCtx;
}

function createReverbImpulse(ctx: AudioContext, duration = 2.4, decay = 2.6): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const impulse = ctx.createBuffer(2, length, sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < length; i++) {
      const t = i / length;
      lp += 0.25 * (Math.random() * 2 - 1 - lp);
      data[i] = lp * Math.pow(1 - t, decay) * (i < sampleRate * 0.015 ? i / (sampleRate * 0.015) : 1);
    }
  }
  return impulse;
}

export async function playNetflixTudum(force = false): Promise<boolean> {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      return false;
    }
  }

  if (ctx.state !== 'running') return false;
  if (hasPlayedThisMount && !force) return true;
  hasPlayedThisMount = true;

  const now = ctx.currentTime + 0.02;

  // Master chain: Compressor -> Master Gain -> Destination
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.85, now);

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.setValueAtTime(-14, now);
  comp.knee.setValueAtTime(12, now);
  comp.ratio.setValueAtTime(4, now);
  comp.connect(ctx.destination);
  master.connect(comp);

  // Subtle hall reverb
  const verb = ctx.createConvolver();
  verb.buffer = createReverbImpulse(ctx, 2.2, 2.5);
  const wet = ctx.createGain();
  wet.gain.setValueAtTime(0.42, now);
  verb.connect(wet);
  wet.connect(master);

  const triggerHit = (
    startTime: number,
    duration: number,
    freqs: number[],
    subStart: number,
    subEnd: number,
    gainPeak: number,
    filterEnd: number,
  ) => {
    // Sub-bass / Timpani punch
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(subStart, startTime);
    sub.frequency.exponentialRampToValueAtTime(subEnd, startTime + Math.min(0.28, duration * 0.6));

    subGain.gain.setValueAtTime(0.001, startTime);
    subGain.gain.linearRampToValueAtTime(gainPeak * 1.15, startTime + 0.014);
    subGain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    sub.connect(subGain);
    subGain.connect(master);
    sub.start(startTime);
    sub.stop(startTime + duration + 0.05);

    // Rich orchestral chord layer
    const chordFilter = ctx.createBiquadFilter();
    chordFilter.type = 'lowpass';
    chordFilter.frequency.setValueAtTime(1900, startTime);
    chordFilter.frequency.exponentialRampToValueAtTime(filterEnd, startTime + duration);
    chordFilter.Q.setValueAtTime(1.1, startTime);

    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0.001, startTime);
    chordGain.gain.linearRampToValueAtTime(gainPeak * 0.45, startTime + 0.025);
    chordGain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    chordGain.connect(chordFilter);
    chordFilter.connect(master);
    chordFilter.connect(verb);

    freqs.forEach((f, idx) => {
      [-4, 4].forEach((detuneCents) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(f, startTime);
        osc.detune.setValueAtTime(detuneCents, startTime);
        osc.connect(chordGain);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    });
  };

  // Beat 1: "Ta-" (short punchy percussion + fifth)
  triggerHit(now, 0.22, [73.42, 146.83, 220.0], 98, 62, 0.55, 600);

  // Beat 2: "-dum!" (deep booming resonant chord + long cinematic tail)
  triggerHit(now + 0.24, 2.35, [73.42, 110.0, 146.83, 185.0, 220.0, 293.66], 88, 36.71, 0.78, 340);

  return true;
}

export function resetTudumFlag() {
  hasPlayedThisMount = false;
}
