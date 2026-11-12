import { useEffect, useRef } from 'react';
import { profile } from '../data/portfolio';

const UNIVERSE_TAGS = [
  { label: 'Python', x: '12%', y: '22%', z: 1.2 },
  { label: 'Flask', x: '78%', y: '18%', z: 0.9 },
  { label: 'JavaScript', x: '8%', y: '68%', z: 1.4 },
  { label: 'HTML & CSS', x: '82%', y: '64%', z: 1.1 },
  { label: 'SQL', x: '22%', y: '44%', z: 0.7 },
  { label: 'Git & GitHub', x: '72%', y: '42%', z: 0.8 },
  { label: 'AI & EdTech', x: '18%', y: '82%', z: 1.0 },
  { label: 'UI Craft', x: '76%', y: '82%', z: 1.3 },
];

/**
 * Scene 02 — The Creative Universe (inspired by cinematic-portofilo):
 * An orbiting light-painting ribbon (cooling white -> salmon -> crimson) and floating ember sparks
 * weaving in 3D depth around Saransh's silhouette and skill cards.
 */
export default function CinematicUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ptr = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let visible = true;
    const trail: { x: number; y: number; z: number }[] = [];
    const MAX_TRAIL = 110;

    // 70 ember particles
    const embers = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: -0.0003 - Math.random() * 0.0007,
      r: 0.8 + Math.random() * 1.8,
      a: 0.25 + Math.random() * 0.6,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    }, { threshold: 0.05 });
    io.observe(wrap);

    let t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      t += 0.018;

      ptr.current.x += (ptr.current.tx - ptr.current.x) * 0.06;
      ptr.current.y += (ptr.current.ty - ptr.current.y) * 0.06;

      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      ctx.clearRect(0, 0, W, H);

      // Ambient crimson core glow
      const cx = W * 0.5 + ptr.current.x * 24;
      const cy = H * 0.52 + ptr.current.y * 16;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(W, H) * 0.48);
      grad.addColorStop(0, 'rgba(222, 27, 28, 0.24)');
      grad.addColorStop(0.5, 'rgba(130, 12, 18, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Parametric 3D light-painting ribbon orbit
      const rx = Math.min(W * 0.36, 340);
      const ry = Math.min(H * 0.28, 170);
      const hx = cx + Math.sin(t * 1.15) * rx + Math.cos(t * 0.43) * rx * 0.25;
      const hy = cy + Math.sin(t * 0.85) * ry * 0.75 + Math.cos(t * 1.7) * ry * 0.35;
      const hz = Math.cos(t * 1.15);

      trail.push({ x: hx, y: hy, z: hz });
      if (trail.length > MAX_TRAIL) trail.shift();

      // Draw ember sparks
      for (const e of embers) {
        e.x += e.vx;
        e.y += e.vy;
        if (e.y < -0.05) {
          e.y = 1.05;
          e.x = Math.random();
        }
        if (e.x < 0) e.x = 1;
        if (e.x > 1) e.x = 0;
        const ex = e.x * W + ptr.current.x * 14;
        const ey = e.y * H + ptr.current.y * 10;
        const distToHead = Math.hypot(ex - hx, ey - hy);
        const flare = Math.max(0, 1 - distToHead / 140);
        ctx.beginPath();
        ctx.arc(ex, ey, e.r + flare * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${Math.round(80 + flare * 160)}, ${Math.round(80 + flare * 150)}, ${Math.min(1, e.a + flare * 0.6)})`;
        ctx.fill();
      }

      // Draw light-painting ribbon cooling white -> salmon -> crimson
      if (trail.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const age = i / trail.length; // 0 = oldest, 1 = head
          const r = Math.round(140 + age * 115);
          const g = Math.round(15 + Math.pow(age, 2.2) * 215);
          const b = Math.round(20 + Math.pow(age, 2.6) * 220);
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineWidth = 1.5 + age * 5.5 + (p1.z > 0 ? p1.z * 2 : 0);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${age * 0.82})`;
          ctx.stroke();
        }

        // Bright light head
        const headGlow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 34);
        headGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        headGlow.addColorStop(0.3, 'rgba(255, 80, 90, 0.55)');
        headGlow.addColorStop(1, 'rgba(222, 27, 28, 0)');
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(hx, hy, 34, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        ptr.current.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        ptr.current.ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }}
      className="relative mb-12 h-[340px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#020204] sm:h-[420px]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* Center silhouette of Saransh */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[84%] items-end justify-center">
        <img
          src={profile.portrait.src}
          alt=""
          className="h-full w-auto object-contain object-bottom opacity-80 brightness-90 contrast-125 drop-shadow-[0_0_40px_rgba(222,27,28,0.45)] [mask-image:linear-gradient(to_bottom,black_55%,transparent_98%)]"
        />
      </div>

      {/* Floating 3D universe skill cards */}
      {UNIVERSE_TAGS.map((tag) => (
        <div
          key={tag.label}
          className="cine-chip pointer-events-none absolute hidden shadow-[0_8px_24px_rgba(0,0,0,0.65)] sm:block"
          style={{ left: tag.x, top: tag.y }}
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-crimson-2" />
          {tag.label}
        </div>
      ))}

      {/* Corner editorial caption */}
      <div className="pointer-events-none absolute left-5 top-5 sm:left-8 sm:top-7">
        <p className="font-editorial text-[10px] uppercase tracking-[0.34em] text-crimson-2">The Creative Universe</p>
        <p className="mt-1 font-display text-2xl tracking-wide text-bone sm:text-4xl">TOOLS · IDEAS · IMPACT</p>
      </div>
      <div className="cine-grid-dots pointer-events-none absolute bottom-5 right-6" aria-hidden>
        {Array.from({ length: 15 }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
    </div>
  );
}
