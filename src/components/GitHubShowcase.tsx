import { useState } from 'react';
import { Github, Star, GitFork, ExternalLink, Terminal, Code2, CheckCircle2 } from 'lucide-react';
import { profile } from '../data/portfolio';
import { playClick } from '../lib/sound';
import Magnetic from './ui/Magnetic';
import SectionLabel from './ui/SectionLabel';
import Reveal from './ui/Reveal';

interface PinnedRepo {
  name: string;
  description: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  url: string;
  tags: string[];
}

const PINNED_REPOS: PinnedRepo[] = [
  {
    name: 'educloud-portal',
    description: 'College Resource Management Platform connecting teachers and students through a centralized digital learning environment.',
    lang: 'Python / Flask',
    langColor: '#3572A5',
    stars: 24,
    forks: 6,
    url: 'https://github.com/saranshpareek931-create/educloud-portal',
    tags: ['Python', 'Flask', 'SQL', 'EdTech', 'Live on Render'],
  },
  {
    name: 'gram-sathi',
    description: 'Civic-tech scheme discovery & digital assistance platform built to empower rural citizens with clear eligibility checks.',
    lang: 'HTML / JavaScript',
    langColor: '#f1e05a',
    stars: 19,
    forks: 4,
    url: 'https://gramsathidigitalseva.netlify.app/#home',
    tags: ['Civic Tech', 'JavaScript', 'Rural India', 'Live on Netlify'],
  },
  {
    name: 'quiz-master',
    description: 'AI-Powered Learning & Quiz Generation Platform that turns study material into revision quizzes for self-assessment.',
    lang: 'Python / AI',
    langColor: '#3572A5',
    stars: 16,
    forks: 3,
    url: 'https://github.com/saranshpareek931-create',
    tags: ['AI', 'EdTech', 'Flask', 'Self-Assessment'],
  },
  {
    name: 'my-portfolio',
    description: 'Cinematic interactive developer portfolio with physics pull-cord theme switch, WebGL effects, and custom audio.',
    lang: 'TypeScript / React',
    langColor: '#3178c6',
    stars: 38,
    forks: 11,
    url: 'https://github.com/saranshpareek931-create/my-portfolio',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
  },
];

const LANGUAGES = [
  { name: 'HTML & CSS', share: '36%', color: '#e34c26' },
  { name: 'JavaScript', share: '30%', color: '#f1e05a' },
  { name: 'Python', share: '24%', color: '#3572A5' },
  { name: 'SQL', share: '10%', color: '#e38c00' },
];

export default function GitHubShowcase() {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', 'Python', 'Flask', 'JavaScript', 'EdTech', 'Civic Tech', 'Live on Render'];

  const filteredRepos = selectedTag === 'All'
    ? PINNED_REPOS
    : PINNED_REPOS.filter((r) => r.tags.includes(selectedTag));

  return (
    <section id="github-showcase" className="relative px-4 py-24 md:px-8 md:py-32" aria-labelledby="github-title">
      <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="04">Open Source &amp; Code</SectionLabel>
          <h2 id="github-title" className="mt-6 text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] font-medium tracking-[-0.045em]">
            <span>Code repository</span>{' '}
            <span className="font-serif font-normal italic">&amp; activity.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Magnetic>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg hover:bg-fg hover:text-bg"
            >
              <Github size={16} />
              <span>Visit @saranshpareek931-create</span>
              <ExternalLink size={13} className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* GitHub Overview Card */}
      <Reveal className="mb-12 overflow-hidden rounded-2xl border border-line bg-surface p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left stats */}
          <div className="space-y-6 lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="font-mono text-sm font-semibold tracking-tight text-fg">Engineering Highlights</h3>
                <p className="font-mono text-xs text-muted">Shipped products, civic services &amp; EdTech hubs</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-line py-5">
              <div>
                <span className="block font-mono text-2xl font-bold text-fg">3 Originals</span>
                <span className="font-mono text-xs text-muted">Shipped Live Products</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-accent">88%</span>
                <span className="font-mono text-xs text-muted">HTML &amp; UI Craft</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-fg">82%</span>
                <span className="font-mono text-xs text-muted">Git &amp; GitHub Mastery</span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold text-fg">100%</span>
                <span className="font-mono text-xs text-muted">User Value First</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted">
              <CheckCircle2 size={14} className="text-accent" />
              <span>Live on Render (EduCloud) &amp; Netlify (Gram Sathi)</span>
            </div>
          </div>

          {/* Right Language Breakdown */}
          <div className="space-y-4 lg:col-span-7 lg:border-l lg:border-line lg:pl-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-wider text-muted uppercase">Primary Language Distribution</span>
              <span className="font-mono text-xs text-accent">Python · Flask · JavaScript</span>
            </div>

            {/* Language multi-segmented progress bar */}
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-2 p-0.5">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: lang.share, backgroundColor: lang.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  title={`${lang.name}: ${lang.share}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
              {LANGUAGES.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="text-xs text-fg">{lang.name}</span>
                  <span className="font-mono text-[10px] text-muted">({lang.share})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              playClick(600, 0.03);
              setSelectedTag(tag);
            }}
            className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
              selectedTag === tag
                ? 'bg-accent text-bg font-semibold'
                : 'border border-line bg-surface text-muted hover:border-fg hover:text-fg'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Repos Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredRepos.map((repo, idx) => (
          <Reveal key={repo.name} delay={idx * 0.08} className="flex">
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="holo-card group flex w-full flex-col justify-between rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-accent" />
                    <span className="font-mono text-xs text-muted">Original</span>
                  </div>
                  <ExternalLink size={14} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                </div>

                <h3 className="mt-3 text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                  {repo.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{repo.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between font-mono text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    <span>{repo.lang}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-accent" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
