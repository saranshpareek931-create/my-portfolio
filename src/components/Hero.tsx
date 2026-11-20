import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';
import { scrollToId } from '../lib/scroll';
import Magnetic from './ui/Magnetic';
import RotatingBadge from './fx/RotatingBadge';
import DotField from './fx/DotField';
import { useTheme } from '../lib/theme';
import HeroVideo from './HeroVideo';

const EASE = [0.16, 1, 0.3, 1] as const;
const NAME = 'SARANSH';

function RotatingRole({ start }: { start: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!start) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => window.clearInterval(id);
  }, [start]);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.roles[i]}
          className="inline-block whitespace-nowrap"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function LocalTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timezone });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t} IST</span>;
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const filmY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const nameX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%']);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer parallax.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const rotY = useTransform(px, (v) => v * 1.1);
  const rotX = useTransform(py, (v) => v * -0.9);
  const nameShiftX = useTransform(px, (v) => v * -1.2);

  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = () => setDesktop(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Spin a full turn whenever the theme changes (skip the first render).
  const theme = useTheme();
  const spin = useAnimationControls();
  const firstTheme = useRef(true);
  useEffect(() => {
    if (firstTheme.current) {
      firstTheme.current = false;
      return;
    }
    if (reduce) return;
    spin.set({ rotateY: 0 });
    void spin.start({ rotateY: 360, transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } });
  }, [theme, reduce, spin]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 18);
    my.set((e.clientY / window.innerHeight - 0.5) * 12);
  };

  const show = ready ? 'show' : 'hidden';
  const fadeIn = (delay: number) => ({
    initial: 'hidden' as const,
    animate: show,
    variants: { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: EASE } } },
  });

  const film = (
    <motion.div
      className="group relative h-full"
      initial={{ clipPath: 'inset(100% -40% 0% -40%)' }}
      animate={ready ? { clipPath: 'inset(-100% -40% 0% -40%)' } : {}}
      transition={{ duration: 1.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      style={{ perspective: 1400 }}
    >
      {/* she turns to face you → a full turn on every light switch → follows the cursor */}
      <motion.div
        className="h-full"
        initial={{ rotateY: reduce ? 0 : -30, z: reduce ? 0 : -140 }}
        animate={ready ? { rotateY: 0, z: 0 } : {}}
        transition={{ duration: 2.2, delay: 0.4, ease: EASE }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div animate={spin} className="h-full" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div style={{ rotateY: rotY, rotateX: rotX, transformStyle: 'preserve-3d' }} className="relative h-full">
            <HeroVideo play={ready} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-4 pt-24 md:h-[100svh] md:min-h-[700px] md:px-8 md:pt-28"
      aria-label="Introduction"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20vh] right-[-10vw] -z-10 h-[140vh] w-[80vw] opacity-90"
        style={{ background: 'radial-gradient(50% 50% at 70% 30%, var(--glow), transparent 70%)' }}
      />
      <DotField />

      {/* Desktop film: big, anchored to the floor, standing in front of the giant name */}
      {desktop && (
      <motion.div
        style={{ y: filmY }}
        className="pointer-events-auto absolute right-[2vw] bottom-0 z-10 h-[calc(100svh-4.5rem)] max-h-[1040px] lg:right-[5vw]"
      >
        {film}
        <div className="absolute bottom-[22%] -left-[16%] z-20">
          <RotatingBadge ready={ready} />
        </div>
      </motion.div>
      )}

      <div className="relative flex flex-1 flex-col justify-center pb-6 md:pb-20">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 md:max-w-[52%]">
          <motion.div
            {...fadeIn(0.05)}
            className="inline-flex w-fit items-center gap-3 rounded-full border border-line bg-bg/70 px-4 py-1.5 text-[12px] text-muted backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-fg">{profile.availability}</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span className="hidden sm:inline">{profile.location}</span>
          </motion.div>

          <motion.p {...fadeIn(0.15)} className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-serif text-[clamp(1.9rem,3.4vw,3.2rem)] leading-none italic">Hello, I'm</span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              <span className="text-faint">— </span>
              <span className="text-fg">
                <RotatingRole start={ready} />
              </span>
            </span>
          </motion.p>
        </motion.div>

        {/* The giant name. She stands in front of it (z-10 film vs z-0 name). */}
        <motion.h1
          style={{ x: nameX }}
          className="relative z-0 -mx-1 mt-2 text-[18.6vw] md:text-[clamp(4.4rem,20.5vw,22rem)] leading-[0.8] font-semibold tracking-[-0.065em] whitespace-nowrap select-none md:-mx-2"
          aria-label={`Hello, I'm ${profile.name}`}
        >
          <motion.span aria-hidden="true" className="inline-block" style={{ x: nameShiftX }}>
            {NAME.split('').map((c, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  // the letters fade as they pass behind her, so her silhouette always reads
                  style={{ color: `color-mix(in oklab, var(--fg) ${Math.round(100 - (i / (NAME.length - 1)) * 82)}%, var(--name-fade))` }}
                  initial={{ y: '105%', rotate: 6 }}
                  animate={ready ? { y: '0%', rotate: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.06, ease: EASE }}
                >
                  {c}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 mt-8 md:mt-10 md:max-w-[46%] lg:max-w-[40%]">
          <motion.p {...fadeIn(0.7)} className="max-w-[36ch] text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.4] tracking-[-0.015em] text-muted">
            Building practical digital products in educational technology, civic services and AI learning with <span className="text-fg">Python, Flask &amp; frontend craft</span>.
          </motion.p>

          <motion.div {...fadeIn(0.9)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('projects');
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg"
              >
                View selected work
                <ArrowDownRight size={16} className="transition-transform duration-500 group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                download="Saransh_Pareek_Resume.pdf"
                className="group inline-flex items-center gap-3 rounded-full border border-line bg-bg/70 px-6 py-3.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-fg"
              >
                Download résumé
                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Mobile film: full width under the intro */}
        {!desktop && <div className="relative z-10 -mx-4 mt-10 h-[min(78svh,140vw)]">{film}</div>}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative z-30 -mx-4 flex items-end justify-between border-t border-line bg-bg/60 px-4 py-4 font-mono text-[11px] tracking-[0.2em] text-muted uppercase backdrop-blur-sm md:-mx-8 md:px-8"
      >
        <button type="button" onClick={() => scrollToId('about')} className="flex items-center gap-3 uppercase">
          <span className="relative h-8 w-px overflow-hidden bg-line">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-fg" />
          </span>
          Scroll to explore
        </button>
        <span className="hidden sm:block">Diploma CSE · Govt. Polytechnic Lisana · Rewari</span>
        <LocalTime />
      </motion.div>
    </section>
  );
}
