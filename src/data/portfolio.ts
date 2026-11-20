/**
 * Central portfolio data for Saransh.
 * Directly synced from github.com/saranshpareek931-create/my-portfolio.
 */

export const profile = {
  fullName: 'Saransh',
  displayName: 'Saransh',
  name: 'Saransh',
  first: 'Saransh',
  firstName: 'SARANSH',
  seriesTag: 'THE SERIES',
  originalLabel: 'A SARANSH ORIGINAL',
  role: 'Software Developer',
  email: 'saranshpareek931@gmail.com',
  gmailUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=saranshpareek931@gmail.com&su=Hello%20Saransh%20%E2%80%94%20Let%27s%20Work%20Together',
  location: 'Rewari, Haryana, India',
  timezone: 'Asia/Kolkata',
  links: {
    github: 'https://github.com/saranshpareek931-create',
    linkedin: 'https://www.linkedin.com/in/saransh96',
    educloud: 'https://educloud-portal.onrender.com/',
    gramsathi: 'https://gramsathidigitalseva.netlify.app/#home',
  },
  resume: '/assets/Saransh_Pareek_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    width: 720,
    height: 880,
    alt: 'Portrait of Saransh',
  },
  roles: [
    'Software Developer',
    'Python & Flask Builder',
    'Frontend Craft Specialist',
    'Product & Problem Solver',
  ],
  availability: 'Open for Internships',
  tagline: ['Python & Flask', 'Frontend Craft', 'Problem Solving'],
  intro:
    'A Diploma in Computer Engineering student at Government Polytechnic Lisana, Rewari, building practical digital products in educational technology, civic services and AI-powered learning with Python, Flask, JavaScript and SQL.',
  motto: 'Learning by Building · User Value First',
  interests: ['Product Thinking', 'Frontend Craft', 'Problem Solving', 'Learning by Building'],
};

export const stats = [
  { value: 3, decimals: 0, suffix: ' Originals', label: 'Real products shipped live' },
  { value: 88, decimals: 0, suffix: '%', label: 'HTML & UI craft proficiency' },
  { value: 82, decimals: 0, suffix: '%', label: 'Git & GitHub version control' },
  { value: 100, decimals: 0, suffix: '%', label: 'User-value first dedication' },
];

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

export type SkillCategory = { id: string; index: string; title: string; blurb: string; skills: string[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    index: '01',
    title: 'Languages & Logic',
    blurb: 'Core programming & data querying. Python for logic and backend, JavaScript for interactive behavior, and SQL for structured storage.',
    skills: ['Python (75%)', 'JavaScript (76%)', 'SQL (72%)'],
  },
  {
    id: 'frontend',
    index: '02',
    title: 'Frontend Craft',
    blurb: 'Designing clean, accessible, and responsive user interfaces that help people achieve their goals effortlessly.',
    skills: ['HTML (88%)', 'CSS (84%)', 'JavaScript (76%)', 'Responsive UI', 'Modern Web'],
  },
  {
    id: 'backend',
    index: '03',
    title: 'Backend & Server',
    blurb: 'Developing backend routes, clean architecture, database schemas, and structured REST APIs with Python Flask.',
    skills: ['Flask (70%)', 'REST APIs', 'Server Routing', 'Authentication', 'SQL'],
  },
  {
    id: 'tools',
    index: '04',
    title: 'Tools & Version Control',
    blurb: 'Professional source code management, continuous deployments on Render & Netlify, and developer workflows.',
    skills: ['Git & GitHub (82%)', 'VS Code', 'Render Deploy', 'Netlify', 'Linux CLI'],
  },
  {
    id: 'focus',
    index: '05',
    title: 'Core Principles',
    blurb: 'A builder mindset focused on user value first, practical software utility, and continuous learning by shipping real projects.',
    skills: ['User Value First', 'Product Thinking', 'Problem Solving', 'Learning by Building'],
  },
];

export const fundamentals = [
  'User Value First',
  'Learning by Building',
  'Clean Logic & Code Structure',
  'Responsive UI Craft',
  'Version Control & Deployment',
];

export type Metric = { value: string; label: string };
export type Project = {
  id: string;
  index: string;
  title: string;
  year: string;
  kind: string;
  summary: string;
  stack: string[];
  contribution: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  live?: string;
  motif: 'scan' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'educloud-portal',
    index: '01',
    title: 'EduCloud Portal',
    year: '2026',
    kind: 'EdTech • Full-Stack • Resource Hub',
    summary:
      'College Resource Management Platform connecting teachers and students through a centralized digital learning environment.',
    stack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    contribution: [
      'EduCloud Portal connects teachers and students through a centralized digital learning environment, helping upload, organize, and access academic resources more efficiently.',
      'Built dedicated teacher dashboards, branch-specific academic resource organization, and QR-based instant sharing for seamless classroom access.',
      'Deployed live on Render with database integration, ensuring reliable access across student and faculty accounts.',
    ],
    features: [
      'Teacher dashboards and academic resource management',
      'Student access to notes, PDFs, manuals, and branch-specific materials',
      'QR-based access for easier resource sharing',
      'Live deployment on Render cloud infrastructure',
    ],
    metrics: [
      { value: 'Live', label: 'Deployed on Render' },
      { value: 'QR', label: 'Instant resource sharing' },
      { value: '2', label: 'Dedicated role portals' },
      { value: '100%', label: 'Branch organized' },
    ],
    github: 'https://github.com/saranshpareek931-create/educloud-portal',
    live: 'https://educloud-portal.onrender.com/',
    motif: 'scan',
  },
  {
    id: 'gram-sathi',
    index: '02',
    title: 'Gram Sathi',
    year: '2026',
    kind: 'Civic Tech • Rural Digital Services',
    summary:
      'Government Scheme Discovery & Digital Assistance Platform built to empower rural citizens with clear eligibility checking.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    contribution: [
      'A rural-tech interface focused on helping citizens understand available government schemes, check eligibility, gather required documents, and learn the steps involved in applying.',
      'Designed around clarity and simplicity so non-technical users can navigate farm loan support, irrigation subsidies, and crop insurance effortlessly.',
      'Shipped live on Netlify with fast, mobile-first responsive performance for low-bandwidth rural connectivity.',
    ],
    features: [
      'Government scheme discovery & search',
      'Clear eligibility checking criteria',
      'Required documents checklist',
      'Step-by-step application guidance',
    ],
    metrics: [
      { value: 'Live', label: 'Deployed on Netlify' },
      { value: 'Rural', label: 'Civic tech focus' },
      { value: 'Clear', label: 'Eligibility workflows' },
      { value: 'Fast', label: 'Mobile-first loading' },
    ],
    github: 'https://github.com/saranshpareek931-create',
    live: 'https://gramsathidigitalseva.netlify.app/#home',
    motif: 'flow',
  },
  {
    id: 'quiz-master',
    index: '03',
    title: 'Quiz Master',
    year: '2026',
    kind: 'AI • EdTech • Self-Assessment',
    summary:
      'AI-Powered Learning & Quiz Generation Platform that turns study material and notes into revision quizzes for self-assessment.',
    stack: ['Python', 'Flask', 'JavaScript', 'SQL'],
    contribution: [
      'A concept-focused learning platform where study material and PDFs can be analyzed to generate quiz-based revision questions and improve self-assessment.',
      'Streamlines student revision workflows by extracting key concepts and producing interactive test questions automatically.',
      'Architected with Python Flask and responsive UI interactions for rapid question generation and score calculation.',
    ],
    features: [
      'Study material & PDF analysis',
      'Automated quiz-based revision generation',
      'Concept-focused self-assessment scoring',
      'Clean interactive quiz interface',
    ],
    metrics: [
      { value: 'AI', label: 'Question generation' },
      { value: 'PDF', label: 'Material analysis' },
      { value: 'Fast', label: 'Self-assessment' },
      { value: 'Python', label: 'Flask backend' },
    ],
    github: 'https://github.com/saranshpareek931-create',
    motif: 'tenants',
  },
];

export type TimelineItem = { period: string; title: string; org: string; place?: string; kind: string; points: string[] };

export const timeline: TimelineItem[] = [
  {
    period: '2026 — Present',
    title: 'Independent Builder & Web Developer',
    org: 'Product Development',
    place: 'Rewari, Haryana',
    kind: 'Work & Projects',
    points: [
      'Designs around user value first — turning real problems in education and rural digital services into clean, usable web experiences.',
      'Built and deployed EduCloud Portal (live on Render) and Gram Sathi (live on Netlify).',
      'Solves problems with clean logic, Python/Flask backends, and responsive frontend craft.',
    ],
  },
  {
    period: '2026 — Present',
    title: 'Diploma in Computer Engineering',
    org: 'Government Polytechnic Lisana',
    place: 'Rewari, Haryana',
    kind: 'Education',
    points: [
      'Focusing on Computer Science fundamentals, web development, logic building, and software problem solving.',
      'Practical software learning through active building and experimentation.',
    ],
  },
];

export type Recognition = { title: string; org: string; detail: string; kind: string; link?: string };

export const recognitions: Recognition[] = [
  {
    title: 'EduCloud Portal — Live Shipped',
    org: 'Render Cloud Deployment',
    kind: 'EdTech',
    detail: 'Centralized academic resource management hub with teacher dashboards, branch notes, and QR sharing.',
    link: 'https://educloud-portal.onrender.com/',
  },
  {
    title: 'Gram Sathi — Live Shipped',
    org: 'Netlify Cloud Deployment',
    kind: 'Civic Tech',
    detail: 'Government scheme discovery and digital assistance platform empowering rural citizens.',
    link: 'https://gramsathidigitalseva.netlify.app/#home',
  },
  {
    title: 'Quiz Master — AI Platform',
    org: 'AI Learning Project',
    kind: 'EdTech',
    detail: 'Intelligent study-material analyzer producing interactive revision quizzes for self-assessment.',
  },
  {
    title: 'User-First Craft',
    org: 'Core Philosophy',
    kind: 'Product Thinking',
    detail: 'Designing interfaces around human user value first — turning complex information into intuitive layouts.',
  },
  {
    title: 'Learning by Building',
    org: 'Engineering Principle',
    kind: 'Full-Stack',
    detail: 'Mastering Python (75%), HTML (88%), CSS (84%), JavaScript (76%), and Git (82%) through shipped products.',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'Live Product', name: 'EduCloud Portal — Deployed on Render', link: 'https://educloud-portal.onrender.com/' },
  { issuer: 'Live Product', name: 'Gram Sathi — Deployed on Netlify', link: 'https://gramsathidigitalseva.netlify.app/#home' },
  { issuer: 'GitHub', name: 'Official Repositories @saranshpareek931-create', link: 'https://github.com/saranshpareek931-create' },
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'github-showcase', label: 'Code' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

/** Which projects use a given skill — used by the Expertise section. */
export function projectsUsing(skill: string): string[] {
  const s = skill.toLowerCase();
  return projects
    .filter((p) => p.stack.some((t) => t.toLowerCase().includes(s) || s.includes(t.toLowerCase())))
    .map((p) => p.title);
}
