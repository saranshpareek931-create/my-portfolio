import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { playCordSnap } from './sound';

export type Theme = 'dark' | 'light';
export type Palette = 'amber' | 'emerald' | 'violet' | 'monochrome';

const listeners = new Set<() => void>();
const root = () => document.documentElement;

export function getTheme(): Theme {
  return root().dataset.theme === 'light' ? 'light' : 'dark';
}

export function getPalette(): Palette {
  const p = root().dataset.palette;
  if (p === 'emerald' || p === 'violet' || p === 'monochrome') return p;
  return 'amber';
}

function apply(theme: Theme, palette?: Palette) {
  root().dataset.theme = theme;
  if (palette) {
    root().dataset.palette = palette;
  }
  
  const bg = theme === 'dark' ? '#080808' : '#fafaf8';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  
  try {
    localStorage.setItem('theme', theme);
    if (palette) localStorage.setItem('palette', palette);
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
}

export function setPalette(palette: Palette) {
  apply(getTheme(), palette);
}

// Initial hydration from storage if exists
if (typeof window !== 'undefined') {
  try {
    const savedPalette = localStorage.getItem('palette') as Palette | null;
    if (savedPalette) {
      root().dataset.palette = savedPalette;
    } else {
      root().dataset.palette = 'amber';
    }
  } catch {
    root().dataset.palette = 'amber';
  }
}

export const prefersReducedMotion = () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);

/**
 * Switch theme. When the View Transitions API exists, the new theme is revealed
 * as an expanding circle that starts at (x, y) — the pull-cord knob.
 */
export function toggleTheme(origin?: { x: number; y: number }) {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

  playCordSnap(next === 'dark');

  if (!doc.startViewTransition || prefersReducedMotion()) {
    root().classList.add('theme-fade');
    apply(next);
    window.setTimeout(() => root().classList.remove('theme-fade'), prefersReducedMotion() ? 0 : 650);
    return;
  }

  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 0;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const t = doc.startViewTransition(() => flushSync(() => apply(next)));
  t.ready.then(() => {
    root().animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 1100, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getTheme,
    () => 'dark' as Theme,
  );
}

export function usePalette(): Palette {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getPalette,
    () => 'amber' as Palette,
  );
}
