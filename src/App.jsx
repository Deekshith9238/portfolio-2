import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { certifications, experience, profile, projects, recognition, skills } from './data';

// Critically damped (no overshoot): nothing on this page is flicked, so nothing should bounce.
const spring = { type: 'spring', bounce: 0, duration: 0.4 };

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        open ? 'bg-black' : scrolled ? 'nav-material' : ''
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="text-[0.9375rem] font-semibold tracking-tight text-ink">
          {profile.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.8125rem] tracking-[-0.005em] text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
          <a
            href={profile.resume}
            download="Deekshith_HU_Resume.pdf"
            className="rounded-full bg-ink px-3.5 py-1 text-[0.8125rem] tracking-[-0.005em] font-medium text-black press hover:opacity-85"
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
            transition={spring}
            className="h-[calc(100dvh-3rem)] overflow-y-auto px-5 pb-8 pt-2 md:hidden"
          >
            {[...navLinks, { href: profile.resume, label: 'Résumé' }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-hairline py-4 text-[1.75rem] font-semibold tracking-tight text-ink"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: spring },
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'center center'] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.86, 1]), { stiffness: 120, damping: 30 });

  return (
    <section id="top" className="px-5 pt-32 md:pt-40">
      <motion.div
        initial="hidden"
        animate="shown"
        transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
        className="mx-auto max-w-[880px] text-center"
      >
        <motion.h1 variants={rise} className="display text-[clamp(3rem,10vw,6.5rem)] text-ink">
          {profile.name}
        </motion.h1>
        <motion.p
          variants={rise}
          className="mx-auto mt-6 max-w-[34ch] text-[clamp(1.3rem,2.6vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink"
        >
          I build AI agents, RAG pipelines, and the React interfaces people use them through.
        </motion.p>
        <motion.p variants={rise} className="mt-4 text-[1.0625rem] text-ink-3">
          {profile.role}
        </motion.p>
        <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-6 py-3 text-[1.0625rem] font-medium text-black press hover:opacity-85"
          >
            Email me
          </a>
          <a
            href="#work"
            className="rounded-full px-6 py-3 text-[1.0625rem] font-medium text-ink ring-1 ring-inset ring-white/25 press hover:bg-white/10"
          >
            See my work
          </a>
        </motion.div>
      </motion.div>

      <div ref={photoRef} className="mx-auto mt-20 max-w-[1240px] md:mt-24">
        <motion.div
          style={{ scale: reduceMotion ? 1 : scale }}
          className="aspect-[4/5] overflow-hidden rounded-[28px] bg-tile sm:aspect-[3/2]"
        >
          <img
            src="/projects/mine.webp"
            alt="Deekshith working on a laptop, face lit by the screen"
            width="2000"
            height="1333"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children, id }) => (
  <h2 id={id} className="display text-[clamp(2.25rem,5vw,3.5rem)] text-ink">
    {children}
  </h2>
);

const ProjectTile = ({ project }) => {
  const wide = project.layout === 'wide';
  const Tag = project.link ? 'a' : 'article';
  const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag
      {...linkProps}
      className={`group flex flex-col overflow-hidden rounded-[28px] bg-tile ${project.link ? 'press' : ''} ${
        wide ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
    >
      <div
        className={`overflow-hidden bg-black ${
          wide ? `aspect-square ${project.flip ? 'md:order-first' : 'md:order-last'}` : 'aspect-[16/9]'
        }`}
      >
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className={`flex flex-1 flex-col p-8 ${wide ? 'md:justify-center md:p-12' : ''}`}>
        <h3 className="display text-[1.75rem] text-ink md:text-[2rem]">{project.title}</h3>
        <p className="mt-4 max-w-[52ch] text-ink-2">{project.summary}</p>
        {project.detail && <p className="mt-3 max-w-[52ch] text-ink-2">{project.detail}</p>}
        <p className="mt-6 text-[0.875rem] text-ink-3">{project.tech.join(', ')}</p>
        {(project.link || project.note) && (
          <p className={`pt-6 text-[0.9375rem] ${wide ? '' : 'mt-auto'}`}>
            {project.link ? (
              <span className="text-glow group-hover:underline">View on GitHub</span>
            ) : (
              <span className="text-ink-3">{project.note}</span>
            )}
          </p>
        )}
      </div>
    </Tag>
  );
};

const Work = () => (
  <section aria-labelledby="work" className="mx-auto max-w-[1080px] px-5 pt-32 md:pt-44">
    <SectionHeading id="work">Selected work</SectionHeading>
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {projects.map((p) => (
        <ProjectTile key={p.title} project={p} />
      ))}
    </div>
  </section>
);

const Experience = () => (
  <section aria-labelledby="experience" className="mx-auto max-w-[1080px] px-5 pt-32 md:pt-44">
    <SectionHeading id="experience">Experience</SectionHeading>
    <ol className="mt-12">
      {experience.map((job) => (
        <li
          key={`${job.company}-${job.role}`}
          className="grid gap-2 border-t border-hairline py-8 md:grid-cols-[200px_1fr] md:gap-10"
        >
          <p className="text-[0.9375rem] text-ink-3 md:pt-1">{job.period}</p>
          <div>
            <h3 className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">{job.role}</h3>
            <p className="text-ink-2">{job.company}</p>
            <ul className="mt-4 max-w-[64ch] space-y-2 text-ink-2">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

const About = () => (
  <section aria-labelledby="about" className="mx-auto max-w-[1080px] px-5 pt-32 md:pt-44">
    <SectionHeading id="about">About</SectionHeading>
    <p className="mt-10 max-w-[30ch] text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink md:max-w-[34ch]">
      I graduated from Malnad College of Engineering in 2025 with an 8.99 GPA in computer science.{' '}
      <span className="text-ink-3">
        Since then I've been shipping AI features and the products around them at Pratishthan Ventures in Bengaluru.
      </span>
    </p>

    <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
      <div>
        <h3 className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">Recognition</h3>
        <ul className="mt-4">
          {recognition.map((r) => (
            <li key={r.title} className="border-t border-hairline py-4">
              <p className="flex justify-between gap-4 text-ink">
                <span>{r.title}</span>
                {r.when && <span className="text-ink-3">{r.when}</span>}
              </p>
              <p className="mt-1 text-[0.9375rem] text-ink-2">{r.by}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">Tools I use</h3>
        <dl className="mt-4">
          {skills.map((s) => (
            <div key={s.group} className="border-t border-hairline py-4">
              <dt className="text-ink">{s.group}</dt>
              <dd className="mt-1 text-[0.9375rem] text-ink-2">{s.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-12 text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink">Certifications</h3>
        <ul className="mt-4">
          {certifications.map((c) => (
            <li key={c.title} className="flex justify-between gap-4 border-t border-hairline py-4 text-ink">
              <span>{c.title}</span>
              <span className="text-ink-3">{c.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section aria-labelledby="contact" className="px-5 pb-24 pt-40 text-center md:pt-56">
    <h2 id="contact" className="display text-[clamp(2.75rem,8vw,5.5rem)] text-ink">
      Let's work together.
    </h2>
    <p className="mx-auto mt-6 max-w-[40ch] text-[1.3125rem] leading-[1.38] text-ink-2">
      I'm open to roles in AI and full-stack engineering. The fastest way to reach me is email.
    </p>
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <a
        href={`mailto:${profile.email}`}
        className="rounded-full bg-ink px-6 py-3 text-[1.0625rem] font-medium text-black press hover:opacity-85"
      >
        {profile.email}
      </a>
      <a
        href={profile.resume}
        download="Deekshith_HU_Resume.pdf"
        className="rounded-full px-6 py-3 text-[1.0625rem] font-medium text-ink ring-1 ring-inset ring-white/25 press hover:bg-white/10"
      >
        Download résumé
      </a>
    </div>
    <p className="mt-8 flex justify-center gap-6">
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-glow hover:underline">
        GitHub
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-glow hover:underline">
        LinkedIn
      </a>
    </p>
  </section>
);

const Footer = () => (
  <footer className="px-5">
    <div className="mx-auto flex max-w-[1040px] flex-col gap-4 border-t border-hairline py-8 text-[0.8125rem] tracking-[-0.005em] text-ink-3 sm:flex-row sm:justify-between">
      <p>© {new Date().getFullYear()} {profile.name}</p>
    <div className="flex gap-6">
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
        GitHub
      </a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
        LinkedIn
      </a>
      <a href={`mailto:${profile.email}`} className="hover:text-ink">
        Email
      </a>
    </div>
    </div>
  </footer>
);

const App = () => (
  <MotionConfig reducedMotion="user">
    <a
      href="#work"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-black"
    >
      Skip to work
    </a>
    <Nav />
    <main>
      <Hero />
      <Work />
      <Experience />
      <About />
      <Contact />
    </main>
    <Footer />
  </MotionConfig>
);

export default App;
