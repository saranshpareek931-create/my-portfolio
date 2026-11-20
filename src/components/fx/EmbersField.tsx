import { useEffect, useRef } from 'react';
import { prefersReducedMotion, useTheme } from '../../lib/theme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  fadeSpeed: number;
  hue: number;
}

export default function EmbersField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (prefersReducedMotion()) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf = 0;
    let mouseX = w / 2;
    let mouseY = h / 2;

    const isDark = document.documentElement.dataset.theme !== 'light';
    const PARTICLE_COUNT = isDark ? 45 : 20;

    const particles: Particle[] = [];

    const getAccentRGB = () => {
      const prop = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
      return prop || (isDark ? '245, 158, 11' : '217, 119, 6');
    };

    let accentRGB = getAccentRGB();

    const createParticle = (initialRandomY = false): Particle => {
      return {
        x: Math.random() * w,
        y: initialRandomY ? Math.random() * h : h + 10 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(0.3 + Math.random() * 0.7),
        size: 1 + Math.random() * 2.2,
        baseAlpha: 0.15 + Math.random() * 0.55,
        alpha: 0,
        fadeSpeed: 0.004 + Math.random() * 0.008,
        hue: Math.random() * 30 - 15,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(true));
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      accentRGB = getAccentRGB();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Subtle wind toward cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          p.x += (dx / dist) * 0.35;
          p.y += (dy / dist) * 0.35;
        }

        // Fade in and out
        if (p.y > h * 0.8) {
          p.alpha = Math.min(p.baseAlpha, p.alpha + p.fadeSpeed * 2);
        } else if (p.y < h * 0.15) {
          p.alpha = Math.max(0, p.alpha - p.fadeSpeed * 1.5);
        } else {
          p.alpha = Math.min(p.baseAlpha, p.alpha + p.fadeSpeed);
        }

        // Respawn if off screen
        if (p.y < -20 || p.x < -20 || p.x > w + 20 || (p.y < h * 0.15 && p.alpha <= 0.01)) {
          particles[i] = createParticle(false);
          continue;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = `rgba(${accentRGB}, ${p.alpha.toFixed(3)})`;
          ctx.shadowColor = `rgba(${accentRGB}, ${p.alpha.toFixed(3)})`;
          ctx.shadowBlur = p.size * 3.5;
        } else {
          ctx.fillStyle = `rgba(${accentRGB}, ${(p.alpha * 0.5).toFixed(3)})`;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [theme]);

  if (prefersReducedMotion()) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] opacity-80"
    />
  );
}
