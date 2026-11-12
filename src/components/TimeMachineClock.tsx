import { useState } from 'react';
import { motion } from 'framer-motion';

const NODES = [
  { year: '2024', title: 'Foundations', detail: 'Started programming logic, HTML, CSS & web fundamentals.' },
  { year: '2025', title: 'Python & SQL', detail: 'Built backend skills with Python, Flask, SQL & Git workflows.' },
  { year: '2026', title: 'CSE & Live Apps', detail: 'Diploma in CSE at Govt. Polytechnic Lisana + shipped EduCloud & Gram Sathi.' },
  { year: 'NEXT', title: 'Impact & Scale', detail: 'Open for internships, AI-powered tools & real-world software engineering.' },
];

/**
 * Scene 03 — The Time Machine (inspired by cinematic-portofilo):
 * Interactive clock hand & curved timeline arc. Moving the pointer swings the clock hand
 * across Saransh's milestones and illuminates the active era.
 */
export default function TimeMachineClock() {
  const [activeIx, setActiveIx] = useState(2); // 2026 by default
  const [hoverProgress, setHoverProgress] = useState(2 / (NODES.length - 1));

  // Clock hand sweeps -56deg to +56deg
  const handAngle = -56 + hoverProgress * 112;

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setHoverProgress(p);
        const ix = Math.round(p * (NODES.length - 1));
        if (ix !== activeIx) setActiveIx(ix);
      }}
      className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_62%,rgba(222,27,28,0.16),#040406_68%)] p-6 sm:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-editorial text-[10px] uppercase tracking-[0.34em] text-crimson-2">Time Machine · Interactive</p>
          <h3 className="mt-1 font-display text-3xl tracking-wide text-bone sm:text-4xl">A JOURNEY THROUGH TIME</h3>
        </div>
        <p className="font-editorial text-[10px] uppercase tracking-[0.28em] text-smoke">
          Move cursor or tap a year →
        </p>
      </div>

      {/* Clock + Arc Visual */}
      <div className="relative my-8 flex h-44 items-center justify-center sm:h-52">
        {/* Giant subtle clock dial */}
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-black/40 shadow-[0_0_80px_rgba(222,27,28,0.2),inset_0_0_40px_rgba(222,27,28,0.1)] sm:h-52 sm:w-52">
          <div className="absolute inset-3 rounded-full border border-dashed border-white/10" />
          {/* Clock ticks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-2 h-2 w-px -translate-x-1/2 bg-white/25"
              style={{ transformOrigin: '50% 80px', transform: `rotate(${i * 30}deg)` }}
            />
          ))}
          {/* Swinging crimson clock hand */}
          <motion.div
            className="absolute bottom-1/2 left-1/2 h-[38%] w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-t from-crimson to-white shadow-[0_0_14px_rgba(255,42,43,0.9)]"
            style={{ transformOrigin: '50% 100%' }}
            animate={{ rotate: handAngle }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
          <div className="z-10 h-3.5 w-3.5 rounded-full border border-white/60 bg-crimson shadow-[0_0_16px_#ff2a2b]" />
          <span className="absolute bottom-5 font-display text-2xl tracking-wider text-bone/90">
            {NODES[activeIx].year}
          </span>
        </div>
      </div>

      {/* Year cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {NODES.map((n, i) => {
          const on = i === activeIx;
          return (
            <button
              key={n.year}
              type="button"
              onClick={() => {
                setActiveIx(i);
                setHoverProgress(i / (NODES.length - 1));
              }}
              className={`rounded-2xl border p-4 text-left transition duration-300 ${
                on
                  ? 'border-crimson-2 bg-crimson/15 shadow-[0_0_30px_rgba(222,27,28,0.22)]'
                  : 'border-white/10 bg-black/40 hover:border-white/25'
              }`}
            >
              <span className={`font-display text-2xl tracking-wider ${on ? 'text-crimson-2' : 'text-smoke'}`}>{n.year}</span>
              <p className="mt-1 text-sm font-semibold text-bone">{n.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-mist">{n.detail}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
