/**
 * Central portfolio data for Saransh.
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Saransh',
  displayName: 'Saransh',
  firstName: 'SARANSH',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A SARANSH ORIGINAL',
  role: 'Software Developer',
  tagline: ['Python & Flask', 'Frontend Craft', 'Problem Solving'],
  intro:
    'A Diploma in Computer Engineering student at Government Polytechnic Lisana, Rewari, building practical digital products in educational technology, civic services and AI-powered learning with Python, Flask, JavaScript and SQL.',
  location: 'Rewari, Haryana, India',
  email: 'saranshpareek931@gmail.com',
  links: {
    github: 'https://github.com/saranshpareek931-create',
    educloud: 'https://educloud-portal.onrender.com/',
  },
  resumePdf: '',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Saransh',
  },
  interests: ['Product Thinking', 'Frontend Craft', 'Problem Solving', 'Learning by Building'],
};

export const education = [
  {
    school: 'Government Polytechnic Lisana',
    place: 'Rewari, Haryana',
    degree: 'Diploma in Computer Engineering',
    period: '2026 — Present',
    score: 'CSE',
  },
  {
    school: 'Computer Science Fundamentals',
    place: 'Self-driven & Academic',
    degree: 'Web development, logic building, practical problem solving, and software learning.',
    period: 'Continuous',
    score: 'Focus',
  },
];

export const experience = [
  {
    company: 'Independent Builder',
    role: 'Product & Web Developer',
    place: 'Rewari, Haryana',
    period: '2026 — Present',
    points: [
      'Designs around user value first — turning real problems in education and rural digital services into clean, usable web experiences.',
      'Learns through building real projects across Python, Flask, JavaScript, SQL, and modern frontend interfaces.',
      'Solves problems with clean logic, structured data flows, and responsive UI craft.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  live?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'educloud-portal',
    title: 'EduCloud Portal',
    year: '2026',
    genre: 'EdTech • Full-Stack • Resource Hub',
    logline: 'College Resource Management Platform connecting teachers and students through a centralized digital learning environment.',
    stack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    build: [
      'EduCloud Portal connects teachers and students through a centralized digital learning environment, helping upload, organize, and access academic resources more efficiently.',
      'Built dedicated teacher dashboards, branch-specific academic resource organization, and QR-based instant sharing for seamless classroom access.',
    ],
    features: [
      'Teacher dashboards and academic resource management',
      'Student access to notes, PDFs, manuals, and branch-specific materials',
      'QR-based access for easier resource sharing',
    ],
    metrics: [
      { value: 'Live', label: 'deployed on Render' },
      { value: 'QR', label: 'instant sharing' },
      { value: '2', label: 'dedicated portals' },
      { value: '100%', label: 'branch organized' },
    ],
    github: 'https://github.com/saranshpareek931-create/educloud-portal',
    live: 'https://educloud-portal.onrender.com/',
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' },
    motif: 'shield',
  },
  {
    id: 'gram-sathi',
    title: 'Gram Sathi',
    year: '2026',
    genre: 'Civic Tech • Rural Digital Services',
    logline: 'Government Scheme Discovery & Digital Assistance Platform built to empower rural citizens.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    build: [
      'A rural-tech interface focused on helping citizens understand available government schemes, check eligibility, gather required documents, and learn the steps involved in applying.',
      'Designed around clarity and simplicity so non-technical users can navigate farm loan support, irrigation subsidies, and crop insurance effortlessly.',
    ],
    features: [
      'Government scheme discovery & search',
      'Clear eligibility checking',
      'Required documents checklist',
      'Step-by-step application guidance',
    ],
    metrics: [
      { value: 'Live', label: 'deployed on Netlify' },
      { value: 'Rural', label: 'civic tech focus' },
      { value: 'Clear', label: 'eligibility flows' },
    ],
    live: 'https://gramsathidigitalseva.netlify.app/#home',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    year: '2026',
    genre: 'AI • EdTech • Self-Assessment',
    logline: 'AI-Powered Learning & Quiz Generation Platform that turns study material into revision quizzes.',
    stack: ['Python', 'Flask', 'JavaScript', 'SQL'],
    build: [
      'A concept-focused learning platform where study material and PDFs can be analyzed to generate quiz-based revision questions and improve self-assessment.',
      'Streamlines student revision workflows by extracting key concepts and producing interactive test questions automatically.',
    ],
    features: [
      'Study material & PDF analysis',
      'Automated quiz-based revision generation',
      'Concept-focused self-assessment',
    ],
    metrics: [
      { value: 'AI', label: 'question generation' },
      { value: 'PDF', label: 'material analysis' },
      { value: 'Fast', label: 'self-assessment' },
    ],
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'tenants',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'educloud-launch',
    title: 'EduCloud Portal',
    org: 'Live EdTech Product',
    detail: 'Built and deployed a centralized academic resource management platform with teacher dashboards and QR sharing.',
    laurel: 'Shipped Live',
    link: 'https://educloud-portal.onrender.com/',
  },
  {
    id: 'gram-sathi-launch',
    title: 'Gram Sathi',
    org: 'Rural Digital Assistance',
    detail: 'Created a civic-tech interface helping citizens discover government schemes, eligibility, and application steps.',
    laurel: 'Social Impact',
    link: 'https://gramsathidigitalseva.netlify.app/#home',
  },
  {
    id: 'quiz-master-build',
    title: 'Quiz Master',
    org: 'AI-Powered Learning',
    detail: 'Engineered an intelligent study-material analyzer that generates revision quizzes for self-assessment.',
    laurel: 'AI Innovation',
  },
  {
    id: 'user-value',
    title: 'User-First Craft',
    org: '01 · Core Principle',
    detail: 'Designs around user value first, turning complex information into clean, accessible digital workflows.',
    laurel: 'Product Thinking',
  },
  {
    id: 'clean-logic',
    title: 'Learning by Building',
    org: '02 · Core Principle',
    detail: 'Solves real-world problems with clean logic, Python/Flask backends, and responsive frontend craft.',
    laurel: 'Full-Stack Focus',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'EduCloud', name: 'Live Deployment on Render — Centralized Academic Hub', link: 'https://educloud-portal.onrender.com/' },
  { issuer: 'Gram Sathi', name: 'Live Deployment on Netlify — Civic Scheme Discovery', link: 'https://gramsathidigitalseva.netlify.app/#home' },
  { issuer: 'GitHub', name: 'Open Source Portfolio & Project Repositories', link: 'https://github.com/saranshpareek931-create' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages & Logic',
    subtitle: 'Core programming & querying (75–76%)',
    skills: [
      { name: 'Python', mono: 'Py', note: '75%' },
      { name: 'JavaScript', mono: 'Js', note: '76%' },
      { name: 'SQL', mono: 'Sq', note: '72%' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Craft',
    subtitle: 'Clean UI & responsive web (84–88%)',
    skills: [
      { name: 'HTML', mono: 'Ht', note: '88%' },
      { name: 'CSS', mono: 'Cs', note: '84%' },
      { name: 'JavaScript', mono: 'Js', note: '76%' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Tools',
    subtitle: 'Server-side & version control',
    skills: [
      { name: 'Flask', mono: 'Fl', note: '70%' },
      { name: 'Git & GitHub', mono: 'Gt', note: '82%' },
    ],
  },
  {
    id: 'interests',
    title: 'Focus Areas',
    subtitle: 'Building with purpose',
    skills: [
      { name: 'Product Thinking', mono: 'Pt' },
      { name: 'Frontend Craft', mono: 'Fc' },
      { name: 'Problem Solving', mono: 'Ps' },
      { name: 'Learning by Building', mono: 'Lb' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  Python: ['EduCloud Portal', 'Quiz Master', '75% proficiency'],
  HTML: ['EduCloud Portal', 'Gram Sathi', '88% proficiency'],
  CSS: ['EduCloud Portal', 'Gram Sathi', '84% proficiency'],
  JavaScript: ['EduCloud Portal', 'Gram Sathi', 'Quiz Master', '76% proficiency'],
  Flask: ['EduCloud Portal', 'Quiz Master', '70% proficiency'],
  SQL: ['EduCloud Portal', '72% proficiency'],
  'Git & GitHub': ['All repositories on GitHub', '82% proficiency'],
  'Product Thinking': ['Designed around user value first'],
  'Frontend Craft': ['Clean, responsive interfaces'],
  'Problem Solving': ['Practical civic & educational tools'],
  'Learning by Building': ['3+ shipped real-world products'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'Academic Foundation',
    period: '2026 — Present',
    synopsis: 'Diploma in Computer Engineering at Government Polytechnic Lisana, Rewari (Haryana).',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Computer Engineering',
        description: 'Building a strong foundation in Computer Science fundamentals, web development, logic building, and practical software problem solving.',
        tags: ['CSE Diploma', 'Rewari', 'Fundamentals'],
        runtime: '2026 — Present',
        palette: violet,
      },
    ],
  },
  {
    number: 2,
    title: 'Frontend Craft',
    period: 'Core Skills',
    synopsis: 'Designing intuitive, responsive web experiences with HTML, CSS, and JavaScript.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'Clean Interfaces',
        description: 'Mastering HTML (88%), CSS (84%), and JavaScript (76%) to turn complex information into clear, user-friendly layouts.',
        tags: ['HTML 88%', 'CSS 84%', 'JavaScript 76%'],
        runtime: 'UI & Flow',
        palette: amber,
      },
    ],
  },
  {
    number: 3,
    title: 'Backend & Data',
    period: 'Server Logic',
    synopsis: 'Powering practical applications with Python, Flask, SQL, and Git version control.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Python & Flask',
        description: 'Developing backend routes, database schemas with SQL (72%), and version-controlled workflows with Git & GitHub (82%).',
        tags: ['Python 75%', 'Flask 70%', 'SQL 72%', 'Git 82%'],
        runtime: 'Full-Stack',
        palette: ocean,
      },
    ],
  },
  {
    number: 4,
    title: 'Building Real Products',
    period: '2026',
    synopsis: 'Three Originals — an EdTech hub, a rural civic-tech platform, and an AI quiz generator.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'EduCloud Portal',
        description: 'Connects teachers and students in a centralized digital learning hub with dashboards, branch-wise notes, and QR sharing.',
        tags: ['Python', 'Flask', 'SQL', 'Live'],
        runtime: 'EdTech',
        palette: crimson,
      },
      {
        code: 'S04 E02',
        title: 'Gram Sathi',
        description: 'Empowers rural citizens to discover government schemes, check eligibility, and prepare application documents.',
        tags: ['Civic Tech', 'Rural India', 'Live'],
        runtime: 'Social Impact',
        palette: amber,
      },
      {
        code: 'S04 E03',
        title: 'Quiz Master',
        description: 'AI-powered learning platform that analyzes study material to generate revision questions for self-assessment.',
        tags: ['AI', 'EdTech', 'Python'],
        runtime: 'In Preview',
        palette: jade,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'Open for internships, collaborations, and building impactful software products.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'Open for Internships',
        description: 'Ready to contribute product thinking, frontend craft, and Python/Flask skills to real-world engineering teams.',
        tags: ['Internships', 'Web & Product', 'Haryana / Remote'],
        runtime: 'Available Now',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Featured Original', title: 'EduCloud Portal', detail: 'Teacher dashboards, notes & QR access • Live', palette: crimson },
  { label: 'Social Impact', title: 'Gram Sathi', detail: 'Government scheme discovery for rural citizens • Live', palette: amber },
  { label: 'AI Learning', title: 'Quiz Master', detail: 'Generates revision quizzes from study material', palette: ocean },
  { label: 'Frontend Top Skill', title: 'HTML & CSS', detail: '88% HTML • 84% CSS • Clean UI craft', palette: violet },
  { label: 'Backend Stack', title: 'Python & Flask', detail: '75% Python • 70% Flask • 72% SQL', palette: jade },
  { label: 'Scripting & UI', title: 'JavaScript', detail: '76% proficiency • Interactive web apps', palette: amber },
  { label: 'Version Control', title: 'Git & GitHub', detail: '82% proficiency • Open repositories', palette: ocean },
  { label: 'Education', title: 'CSE Diploma', detail: 'Government Polytechnic Lisana, Rewari', palette: violet },
  { label: 'Core Value #1', title: 'User Value First', detail: 'Designing interfaces that help people faster', palette: crimson },
  { label: 'Status', title: 'Open for Internships', detail: 'Based in Haryana, India • Ready to build', palette: jade },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'CSE Diploma',
    lines: ['Government Polytechnic Lisana, Rewari, Haryana', '2026 — Present'],
    chips: ['Computer Engineering'],
  },
  {
    kicker: 'Skills',
    title: 'Python + Web.',
    lines: ['HTML (88%) · CSS (84%) · JavaScript (76%)', 'Python (75%) · Flask (70%) · SQL (72%) · Git & GitHub (82%)'],
    chips: ['Python', 'Flask', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    kicker: 'Mindset',
    title: 'Learning by Building',
    lines: ['01 · Designs around user value first', '02 · Learns through building real projects', '03 · Solves problems with clean logic'],
  },
  {
    kicker: 'Projects',
    title: 'Three Originals',
    lines: ['EduCloud Portal — Centralized college resource hub with QR sharing', 'Gram Sathi — Government scheme discovery for rural citizens', 'Quiz Master — AI-powered revision quiz generator'],
  },
  {
    kicker: 'Current mission',
    title: 'Open for Internships',
    lines: ['Based in Rewari, Haryana · Building web & product impact'],
  },
];

export type ProfileId = 'saransh' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'saransh',
    name: 'Saransh',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, highlights & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & mindset', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • 2026`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 highlights', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Highlights', card: 'My Highlights', meta: `${achievements.length} Moments • Live Projects`, palette: crimson },
  story: { nav: 'Summary', card: 'The Full Story', meta: 'Profile Summary • View & print', palette: violet },
};
