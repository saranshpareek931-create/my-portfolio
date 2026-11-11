import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { startSwarm, toggleSwarm } from './utils/swarm';

const navItems = ['About', 'Projects', 'Skills', 'Education', 'Contact'];

const skills = [
  { name: 'Python', level: 75 },
  { name: 'HTML', level: 88 },
  { name: 'CSS', level: 84 },
  { name: 'JavaScript', level: 76 },
  { name: 'Flask', level: 70 },
  { name: 'SQL', level: 72 },
  { name: 'Git & GitHub', level: 82 },
];

const projects = [
  {
    title: 'EduCloud Portal',
    category: 'College Resource Management Platform',
    description:
      'EduCloud Portal connects teachers and students through a centralized digital learning environment, helping upload, organize, and access academic resources more efficiently.',
    features: [
      'Teacher dashboards and academic resource management',
      'Student access to notes, PDFs, manuals, and branch-specific materials',
      'QR-based access for easier resource sharing',
    ],
    links: [
      { label: 'LIVE WEBSITE', href: 'https://educloud-portal.onrender.com/' },
      { label: 'VIEW SOURCE CODE', href: 'https://github.com/saranshpareek931-create/educloud-portal' },
    ],
    variant: 'edu',
  },
  {
    title: 'Gram Sathi',
    category: 'Government Scheme Discovery & Digital Assistance Platform',
    description:
      'A rural-tech interface focused on helping citizens understand available government schemes, check eligibility, gather required documents, and learn the steps involved in applying.',
    links: [{ label: 'LIVE WEBSITE', href: 'https://gramsathidigitalseva.netlify.app/#home' }],
    variant: 'rural',
  },
  {
    title: 'Quiz Master',
    category: 'AI-Powered Learning & Quiz Generation Platform',
    description:
      'A concept-focused learning platform where study material can be analyzed to generate quiz-based revision questions and improve self-assessment.',
    links: [{ label: 'PREVIEW ONLY', href: '#' }],
    variant: 'ai',
  },
];

const focusAreas = [
  'Product thinking',
  'Frontend craft',
  'Problem solving',
  'Learning by building',
];

const heroMetrics = [
  { value: '3+', label: 'Projects shipped' },
  { value: 'Haryana', label: 'Based in India' },
  { value: 'Open', label: 'For internships' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isInput = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if (e.altKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        toggleSwarm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('saransh_swarm_rebuild_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        startSwarm();
        sessionStorage.setItem('saransh_swarm_rebuild_seen', 'true');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="app-shell">
      <div className="cursor" aria-hidden="true" />

      <header className="site-header">
        <nav className="nav container">
          <a className="brand" href="#home" aria-label="Saransh home">
            S<span>aransh</span>
          </a>

          <div className="nav__links">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="button button--swarm"
              onClick={() => toggleSwarm()}
              title="Rebuild page with Swarm Cursors (Alt+Shift+S)"
            >
              <span className="swarm-dot" aria-hidden="true" />
              <span>Swarm Rebuild</span>
            </button>

            <a className="button button--ghost magnetic" href="#contact">
              Let’s talk
            </a>
          </div>
        </nav>
      </header>

      <main id="home">
        <section className="hero container">
          <motion.div
            className="hero__content"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero__label-row">
              <span className="hero__status-dot" aria-hidden="true" />
              <p className="eyebrow eyebrow--compact">CSE Diploma Student | Aspiring Software Developer</p>
            </div>

            <h1 className="hero__title">
              <span className="hero__title-line">I design</span>
              <span className="hero__title-line hero__title-line--accent">digital experiences</span>
              <span className="hero__title-line">that feel premium.</span>
            </h1>

            <p className="hero__subtitle">
              I’m Saransh, a Diploma in Computer Engineering student from Government Polytechnic Lisana,
              Rewari, building practical products with Python, Flask, JavaScript, and thoughtful UI thinking.
            </p>

            <div className="hero__chip-group" aria-label="Core focus areas">
              {focusAreas.map((item) => (
                <span key={item} className="insight-pill">
                  {item}
                </span>
              ))}
            </div>

            <div className="hero__actions">
              <a className="button magnetic" href="#projects">
                View projects
              </a>
              <a className="button button--secondary magnetic" href="mailto:saranshpareek931@gmail.com">
                Email me
              </a>
            </div>

            <div className="hero__meta">
              {heroMetrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="portrait-wrap">
              <div className="portrait-glow" />
              <div className="portrait-frame">
                <img src="/Professional Passport Portrait.png" alt="Professional portrait of Saransh" />
              </div>
            </div>

            <div className="floating-card floating-card--top">
              <span className="tag">Available</span>
              <strong>Building for</strong>
              <small>Web + product impact</small>
            </div>

            <div className="floating-card floating-card--bottom">
              <span className="tag tag--dark">Focus</span>
              <strong>Python + Web</strong>
              <small>Flask, JS, SQL</small>
            </div>
          </motion.div>
        </section>

        <section className="marquee-wrap">
          <div className="marquee">
            <div className="marquee__track">
              {Array.from({ length: 2 }).flatMap(() => ['Python', 'HTML', 'CSS', 'JavaScript', 'Flask', 'SQL', 'GitHub']).map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          id="about"
          className="about container section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <p className="eyebrow">About me</p>
            <h2>Building thoughtful digital experiences with a practical mindset.</h2>
          </div>

          <div className="about__grid">
            <div className="about__copy">
              <p>
                I’m a Diploma in Computer Engineering student currently studying at Government Polytechnic
                Lisana, Rewari. My interest lies in designing useful digital products, improving user flows,
                and turning real problems into clean, efficient web experiences.
              </p>
              <p>
                My work blends frontend craft, backend thinking, and product-oriented problem solving. I enjoy
                learning by building — from dashboards and discovery platforms to interfaces that help people
                understand information faster and more clearly.
              </p>
            </div>

            <div className="about__stats">
              <div className="stat-box">
                <span className="stat-box__value">01</span>
                <span className="stat-box__label">Designs around user value first</span>
              </div>
              <div className="stat-box">
                <span className="stat-box__value">02</span>
                <span className="stat-box__label">Learns through building real projects</span>
              </div>
              <div className="stat-box">
                <span className="stat-box__value">03</span>
                <span className="stat-box__label">Solves problems with clean logic</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="projects container section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Selected projects</p>
              <h2>My strongest work in educational, civic, and AI-driven experiences.</h2>
            </div>
            <a className="button button--secondary magnetic" href="https://github.com/saranshpareek931-create" target="_blank" rel="noreferrer">
              GitHub profile
            </a>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className={`project ${index === 0 ? 'project--featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`project__visual project__visual--${project.variant}`}>
                  {project.variant === 'edu' && (
                    <div className="mock-window">
                      <div className="window-bar">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="dashboard-shell">
                        <aside>
                          <div className="mini-block" />
                          <div className="mini-block mini-block--active" />
                          <div className="mini-block" />
                          <div className="mini-block" />
                        </aside>
                        <main>
                          <div className="row row--head">
                            <div className="chip chip--red">Resource Hub</div>
                            <div className="chip">Active classes</div>
                          </div>
                          <div className="cards-grid">
                            <div className="mini-card mini-card--large" />
                            <div className="mini-card" />
                            <div className="mini-card" />
                          </div>
                          <div className="graph-lines" />
                        </main>
                      </div>
                    </div>
                  )}

                  {project.variant === 'rural' && (
                    <div className="farmer-card">
                      <div className="farmer-card__top">
                        <span>Scheme finder</span>
                        <span className="dot" />
                      </div>
                      <div className="scheme-list">
                        <div><span className="bullet bullet--red" /> Farm Loan Support</div>
                        <div><span className="bullet" /> Irrigation Subsidy</div>
                        <div><span className="bullet bullet--red" /> Crop Insurance</div>
                      </div>
                    </div>
                  )}

                  {project.variant === 'ai' && (
                    <div className="ai-card">
                      <div className="ai-card__header">
                        <span>Quiz Master</span>
                        <span className="status">Preview</span>
                      </div>
                      <div className="pdf-stack">
                        <div className="pdf-sheet" />
                        <div className="pdf-sheet pdf-sheet--main" />
                      </div>
                      <div className="question-box">
                        <span className="question-box__label">AI question</span>
                        <p>What is the primary purpose of this learning material?</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="project__content">
                  <span className="project__category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  {project.features && (
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  )}

                  <div className="project__links">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        className={link.label === 'PREVIEW ONLY' ? 'preview-tag' : 'button magnetic'}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="skills container section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <p className="eyebrow">Technical skills</p>
            <h2>Learning the fundamentals needed to build practical products.</h2>
          </div>

          <div className="skills__grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <div className="skill-card__header">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <span style={{ width: `${skill.level}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="education"
          className="education container section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Academic foundation and continuous learning.</h2>
          </div>

          <div className="timeline">
            <div className="timeline__item">
              <span className="timeline__year">2026 — Present</span>
              <div>
                <h3>Diploma in Computer Engineering</h3>
                <p>Government Polytechnic Lisana, Rewari</p>
              </div>
            </div>
            <div className="timeline__item">
              <span className="timeline__year">Focus</span>
              <div>
                <h3>Computer Science fundamentals</h3>
                <p>Web development, logic building, practical problem solving, and software learning.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="contact container section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="contact__panel">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let’s build something useful.</h2>
            </div>
            <div className="contact__links">
              <a href="mailto:saranshpareek931@gmail.com">saranshpareek931@gmail.com</a>
              <a href="https://github.com/saranshpareek931-create" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://educloud-portal.onrender.com/" target="_blank" rel="noreferrer">EduCloud Project</a>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="site-footer container">
        <p>© 2026 Saransh. Built with purpose, curiosity, and code.</p>
        <div>
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="mailto:saranshpareek931@gmail.com">Email</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
