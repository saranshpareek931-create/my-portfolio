import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/theme';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || prefersReducedMotion()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('has-custom-cursor');
    setActive(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check what element is under the cursor
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"], input, select, [data-cursor]');
      const cursorAttr = target?.closest('[data-cursor]')?.getAttribute('data-cursor');
      const customLabel = target?.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');

      if (cursorAttr === 'pull') {
        setLabel('PULL');
        setHovered(true);
      } else if (cursorAttr === 'view' || customLabel) {
        setLabel(customLabel || 'VIEW');
        setHovered(true);
      } else if (cursorAttr === 'copy') {
        setLabel('COPY');
        setHovered(true);
      } else if (interactive) {
        setLabel('');
        setHovered(true);
      } else {
        setLabel('');
        setHovered(false);
      }
    };

    const onMouseLeave = () => {
      setHovered(false);
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const loop = () => {
      // Smooth lerp for outer ring
      const factor = 0.16;
      ringX += (mouseX - ringX) * factor;
      ringY += (mouseY - ringY) * factor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[150] overflow-hidden" aria-hidden="true">
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />

      {/* Smooth trailing outer ring / badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          label
            ? '-ml-7 -mt-7 h-14 w-14 border border-accent bg-bg/90 backdrop-blur-md shadow-lg'
            : hovered
            ? '-ml-5 -mt-5 h-10 w-10 border-2 border-accent bg-accent/10'
            : '-ml-4 -mt-4 h-8 w-8 border border-fg/30'
        }`}
        style={{ willChange: 'transform' }}
      >
        {label && (
          <span
            ref={labelRef}
            className="font-mono text-[9px] font-bold tracking-[0.14em] text-accent uppercase select-none"
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
