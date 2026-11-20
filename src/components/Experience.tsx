import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { certifications, recognitions, timeline } from '../data/portfolio';
import SectionLabel from './ui/SectionLabel';
import SplitText from './ui/SplitText';
import Reveal from './ui/Reveal';

export default function Experience() {
  const lineRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative px-4 py-24 md:px-8 md:py-32" aria-labelledby="experience-title">
      <div className="mb-12 md:mb-16">
        <SectionLabel index="04">Experience</SectionLabel>
        <h2 id="experience-title" className="mt-6 text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] font-medium tracking-[-0.045em]">
          <SplitText text="The path," className="block" />
          <SplitText text="so far." delay={0.12} className="block font-serif font-normal tracking-[-0.03em] italic" />
        </h2>
      </div>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Timeline */}
        <div className="lg:col-span-7">
          <h3 className="mb-6 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Work &amp; education</h3>
          <ol ref={lineRef} className="relative">
            <span aria-hidden="true" className="absolute top-1 bottom-1 left-[5px] w-px bg-line" />
            <motion.span aria-hidden="true" style={{ scaleY: reduce ? 1 : scaleY }} className="absolute top-1 bottom-1 left-[5px] w-px origin-top bg-fg" />
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.06} className={`relative pl-8 ${i > 0 ? 'mt-10' : ''}`}>
                <span aria-hidden="true" className="absolute top-1.5 left-0 h-[11px] w-[11px] rounded-full border border-fg bg-bg" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-[clamp(1.2rem,1.7vw,1.5rem)] leading-tight font-medium tracking-[-0.03em]">{t.title}</h4>
                  <span className="font-mono text-[11px] tracking-[0.08em] text-muted">{t.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  <span className="text-fg">{t.org}</span>
                  {t.place ? ` · ${t.place}` : ''}
                </p>
                <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-muted">
                  {t.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-[0.75em] h-px w-2.5 shrink-0 bg-faint" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Recognition */}
        <div className="lg:col-span-5">
          <h3 className="mb-6 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Recognition</h3>
          <ul className="border-t border-line">
            {recognitions.map((r, i) => {
              const Tag = r.link ? 'a' : 'div';
              return (
                <Reveal as="li" key={r.title} delay={i * 0.04} y={14}>
                  <Tag
                    {...(r.link ? { href: r.link, target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-start justify-between gap-4 border-b border-line py-4"
                  >
                    <span>
                      <span className="block font-medium tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1">{r.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {r.org} — {r.detail}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 pt-1 font-mono text-[9.5px] tracking-[0.16em] text-faint uppercase">
                      {r.kind}
                      {r.link && <ArrowUpRight size={12} className="text-fg" />}
                    </span>
                  </Tag>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-20 md:mt-24">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h3 className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Certifications · {certifications.length}</h3>
          <span className="text-xs text-faint">Each links to its credential</span>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.name} delay={(i % 4) * 0.04} y={12} className="h-full bg-bg">
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-start justify-between gap-3 px-4 py-3.5 transition-colors duration-300 hover:bg-fg hover:text-bg"
              >
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.18em] text-muted uppercase transition-colors group-hover:text-bg/60">{c.issuer}</span>
                  <span className="mt-1 block text-sm leading-snug">{c.name}</span>
                </span>
                <ArrowUpRight size={13} className="mt-0.5 shrink-0 opacity-40 transition-all duration-300 group-hover:opacity-100" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
