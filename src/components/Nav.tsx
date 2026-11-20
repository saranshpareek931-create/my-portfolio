import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, Command } from 'lucide-react';
import { navItems, profile } from '../data/portfolio';
import { scrollToId, lockScroll } from '../lib/scroll';
import { useActiveSection } from '../lib/useActiveSection';
import { usePalette, setPalette, type Palette } from '../lib/theme';
import { isSoundEnabled, toggleSound, playClick, playChime } from '../lib/sound';

export default function Nav({
  ready,
  onOpenCommandPalette,
}: {
  ready: boolean;
  onOpenCommandPalette: () => void;
}) {
  const active = useActiveSection();
  const currentPalette = usePalette();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenCommandPalette();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenCommandPalette]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    playClick(680, 0.03);
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  const cyclePalette = () => {
    const sequence: Palette[] = ['amber', 'emerald', 'violet', 'monochrome'];
    const nextIdx = (sequence.indexOf(currentPalette) + 1) % sequence.length;
    const next = sequence[nextIdx];
    setPalette(next);
    playChime(next === 'amber' ? 660 : next === 'emerald' ? 740 : next === 'violet' ? 820 : 580);
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  const paletteColors: Record<Palette, string> = {
    amber: '#f59e0b',
    emerald: '#10b981',
    violet: '#a855f7',
    monochrome: '#ffffff',
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[65] pointer-events-none"
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div
          className={`flex items-center justify-between gap-4 pr-[112px] pl-4 transition-[padding] duration-500 md:pr-[150px] md:pl-8 ${
            compact ? 'pt-3' : 'pt-5 md:pt-7'
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={go('home')}
            className="pointer-events-auto group flex items-center gap-3"
            aria-label="Sushmita Dasari — back to top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-bg font-serif text-xl italic transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
              S
            </span>
            <span
              className={`hidden text-sm font-medium tracking-tight transition-all duration-500 sm:block ${
                compact ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
              }`}
            >
              {profile.name}
            </span>
          </a>

          {/* Navigation Links */}
          <nav aria-label="Primary" className="pointer-events-auto hidden md:block">
            <ul
              className={`flex items-center rounded-full border border-line bg-bg/85 backdrop-blur-md transition-all duration-500 ${
                compact ? 'gap-0 p-1 shadow-[var(--shadow)]' : 'gap-1 p-1.5'
              }`}
            >
              {navItems.map((n) => (
                <li key={n.id} className="relative">
                  <a
                    href={`#${n.id}`}
                    onClick={go(n.id)}
                    aria-current={active === n.id ? 'true' : undefined}
                    className={`group/link relative z-10 block rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${
                      active === n.id ? 'text-bg font-medium' : 'text-muted hover:text-fg'
                    }`}
                  >
                    <span className="relative block overflow-hidden">
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/link:-translate-y-full">
                        {n.label}
                        <span className="absolute top-full left-0" aria-hidden="true">
                          {n.label}
                        </span>
                      </span>
                    </span>
                  </a>
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Action Controls */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Command Palette Button */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Command Palette (Cmd+K / Ctrl+K)"
              aria-label="Open Command Palette"
              className="hidden items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur-sm transition-colors hover:border-fg hover:text-fg sm:flex"
            >
              <Command size={12} className="text-accent" />
              <span>⌘K</span>
            </button>

            {/* Palette Cycle Button */}
            <button
              type="button"
              onClick={cyclePalette}
              title={`Color Palette: ${currentPalette} (Click to switch)`}
              aria-label="Cycle Color Palette"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/90 text-muted backdrop-blur-sm transition-colors hover:border-fg hover:text-fg"
            >
              <span
                className="h-3 w-3 rounded-full transition-transform hover:scale-125"
                style={{ backgroundColor: paletteColors[currentPalette] }}
              />
            </button>

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={handleSoundToggle}
              title={soundOn ? 'Mute tactile UI sound' : 'Enable tactile UI sound'}
              aria-label="Toggle Sound Effects"
              className={`grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/90 backdrop-blur-sm transition-colors hover:border-fg ${
                soundOn ? 'text-accent' : 'text-faint'
              }`}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative grid h-9 w-9 place-items-center rounded-full border border-line bg-bg md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-fg transition-transform duration-500 ${
                  open ? 'rotate-45' : '-translate-y-[3px]'
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-fg transition-transform duration-500 ${
                  open ? '-rotate-45' : 'translate-y-[3px]'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[64] flex flex-col justify-end bg-bg px-6 pb-12 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {navItems.map((n, i) => (
                  <li key={n.id} className="overflow-hidden">
                    <motion.a
                      href={`#${n.id}`}
                      onClick={go(n.id)}
                      className="flex items-baseline gap-4 py-1 text-[13vw] leading-[1.05] font-medium tracking-[-0.04em]"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-mono text-xs tracking-normal text-muted">0{i + 1}</span>
                      <span className={active === n.id ? 'font-serif font-normal italic text-accent' : ''}>
                        {n.label}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs text-muted"
              >
                <Command size={14} className="text-accent" />
                <span>Quick Actions (⌘K)</span>
              </button>
              <button
                type="button"
                onClick={cyclePalette}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs text-muted"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: paletteColors[currentPalette] }} />
                <span className="capitalize">{currentPalette}</span>
              </button>
            </div>

            <div className="mt-6 flex justify-between border-t border-line pt-6 text-sm text-muted">
              <a href={profile.gmailUrl} target="_blank" rel="noreferrer" className="hover:text-fg">{profile.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
