import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { certifications, experience, profile, projects, recognition, skills } from './data';

// Critically damped (no overshoot): nothing on this page is flicked, so nothing should bounce.
const spring = { type: 'spring', bounce: 0, duration: 0.4 };
const revealSpring = { type: 'spring', bounce: 0, duration: 0.9 };

// Leaves room for the 48px nav when Lenis scrolls to an anchor.
const anchorOffset = -64;

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const useTheme = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    // Ease the brightness change instead of flashing, unless the reader asked for less motion.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theming');
      window.setTimeout(() => root.classList.remove('theming'), 400);
    }
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#000000' : '#f5f5f7');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
    setTheme(next);
  };

  return [theme, toggle];
};

const ThemeToggle = () => {
  const [theme, toggle] = useTheme();
  const toLight = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={toLight ? 'Switch to light theme' : 'Switch to dark theme'}
      title={toLight ? 'Light theme' : 'Dark theme'}
      className="press grid h-10 w-10 place-items-center overflow-hidden rounded-full text-ink-2 hover:bg-ink/10 hover:text-ink"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={spring}
          className="grid place-items-center"
        >
          {toLight ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    lenis?.stop();
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
    };
  }, [open, lenis]);

  // Lenis is paused while the menu is open, so close it first and then scroll.
  const goTo = (e, href) => {
    if (!href.startsWith('#')) return setOpen(false);
    e.preventDefault();
    setOpen(false);
    lenis?.start();
    lenis?.scrollTo(href, { offset: anchorOffset });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        open ? 'bg-canvas' : scrolled ? 'nav-material' : ''
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="text-[0.9375rem] font-semibold tracking-tight text-ink">
          {profile.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.8125rem] tracking-[-0.005em] text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="-ml-3 flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resume}
              download="Deekshith_HU_Resume.pdf"
              className="press rounded-full bg-ink px-3.5 py-1 text-[0.8125rem] font-medium tracking-[-0.005em] text-canvas hover:opacity-85"
            >
              Résumé
            </a>
          </div>
        </div>

        <div className="-mr-2 flex items-center md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
            data-lenis-prevent
          >
            {[...navLinks, { href: profile.resume, label: 'Résumé' }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
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

// Fades and lifts content into place the first time it scrolls into view.
const Reveal = ({ as = 'div', delay = 0, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...revealSpring, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: spring },
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const introRef = useRef(null);
  const photoRef = useRef(null);

  // The intro drifts up and fades as you scroll away from it...
  const { scrollYProgress: leave } = useScroll({ target: introRef, offset: ['start start', 'end start'] });
  const introY = useTransform(leave, [0, 1], [0, -120]);
  const introOpacity = useTransform(leave, [0, 0.8], [1, 0]);

  // ...while the photo grows to full size and its contents settle inside the frame.
  const { scrollYProgress: enter } = useScroll({ target: photoRef, offset: ['start end', 'center center'] });
  const photoScale = useTransform(enter, [0, 1], [0.82, 1]);
  const photoRadius = useTransform(enter, [0, 1], [56, 28]);
  const imageScale = useTransform(enter, [0, 1], [1.25, 1]);

  return (
    <section id="top" className="px-5 pt-32 md:pt-40">
      <motion.div ref={introRef} style={reduceMotion ? undefined : { y: introY, opacity: introOpacity }}>
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
              className="press rounded-full bg-ink px-6 py-3 text-[1.0625rem] font-medium text-canvas hover:opacity-85"
            >
              Email me
            </a>
            <a
              href="#work"
              className="press rounded-full px-6 py-3 text-[1.0625rem] font-medium text-ink ring-1 ring-inset ring-ink/25 hover:bg-ink/10"
            >
              See my work
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div ref={photoRef} className="mx-auto mt-20 max-w-[1240px] md:mt-24">
        <motion.div
          style={reduceMotion ? { borderRadius: 28 } : { scale: photoScale, borderRadius: photoRadius }}
          className="aspect-[4/5] overflow-hidden bg-black sm:aspect-[3/2]"
        >
          <motion.img
            src="/projects/mine.webp"
            alt="Deekshith working on a laptop, face lit by the screen"
            width="2000"
            height="1333"
            fetchPriority="high"
            style={reduceMotion ? undefined : { scale: imageScale }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children, id }) => (
  <Reveal as="h2" id={id} className="display text-[clamp(2.25rem,5vw,3.5rem)] text-ink">
    {children}
  </Reveal>
);

const ProjectTile = ({ project }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const wide = project.layout === 'wide';
  const Tag = project.link ? motion.a : motion.article;
  const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};

  // The tile rises into place as it enters; the image drifts slower than the page for depth.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] });
  const tileScale = useTransform(enter, [0, 1], [0.92, 1]);
  const tileOpacity = useTransform(enter, [0, 1], [0.2, 1]);
  const tileY = useTransform(enter, [0, 1], [80, 0]);
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(pass, [0, 1], ['-7%', '7%']);

  return (
    <Tag
      ref={ref}
      {...linkProps}
      style={reduceMotion ? undefined : { scale: tileScale, opacity: tileOpacity, y: tileY }}
      className={`group flex flex-col overflow-hidden rounded-[28px] bg-tile ${
        wide ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
    >
      <div
        className={`overflow-hidden bg-black ${
          wide ? `aspect-square ${project.flip ? 'md:order-first' : 'md:order-last'}` : 'aspect-[16/9]'
        }`}
      >
        <motion.img
          src={project.image}
          alt=""
          loading="lazy"
          style={reduceMotion ? undefined : { y: imageY, scale: 1.16 }}
          className="h-full w-full object-cover"
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
        <Reveal
          as="li"
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
        </Reveal>
      ))}
    </ol>
  </section>
);

const Word = ({ progress, range, children }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
};

// The statement lights up word by word as it scrolls through the viewport.
const ScrollStatement = ({ lead, rest }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = [...lead.split(' ').map((w) => [w, false]), ...rest.split(' ').map((w) => [w, true])];

  return (
    <p
      ref={ref}
      className="mt-10 max-w-[30ch] text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink md:max-w-[34ch]"
    >
      {reduceMotion ? (
        <>
          {lead} <span className="text-ink-3">{rest}</span>
        </>
      ) : (
        words.map(([w, muted], i) => (
          <span key={i} className={muted ? 'text-ink-3' : undefined}>
            <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          </span>
        ))
      )}
    </p>
  );
};

const About = () => (
  <section aria-labelledby="about" className="mx-auto max-w-[1080px] px-5 pt-32 md:pt-44">
    <SectionHeading id="about">About</SectionHeading>
    <ScrollStatement
      lead="I graduated from Malnad College of Engineering in 2025 with an 8.99 GPA in computer science."
      rest="Since then I've been shipping AI features and the products around them at Pratishthan Ventures in Bengaluru."
    />

    <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
      <Reveal>
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
      </Reveal>

      <Reveal delay={0.1}>
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
      </Reveal>
    </div>
  </section>
);

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 0.6'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section aria-labelledby="contact" className="px-5 pb-24 pt-40 text-center md:pt-56">
      <motion.h2
        ref={ref}
        id="contact"
        style={reduceMotion ? undefined : { scale, opacity }}
        className="display text-[clamp(2.75rem,8vw,5.5rem)] text-ink"
      >
        Let's work together.
      </motion.h2>
      <Reveal>
        <p className="mx-auto mt-6 max-w-[40ch] text-[1.3125rem] leading-[1.38] text-ink-2">
          I'm open to roles in AI and full-stack engineering. The fastest way to reach me is email.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="press rounded-full bg-ink px-6 py-3 text-[1.0625rem] font-medium text-canvas hover:opacity-85"
          >
            {profile.email}
          </a>
          <a
            href={profile.resume}
            download="Deekshith_HU_Resume.pdf"
            className="press rounded-full px-6 py-3 text-[1.0625rem] font-medium text-ink ring-1 ring-inset ring-ink/25 hover:bg-ink/10"
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
      </Reveal>
    </section>
  );
};

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
  <ReactLenis root options={{ autoRaf: true, anchors: { offset: anchorOffset }, stopInertiaOnNavigate: true }}>
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
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
  </ReactLenis>
);

export default App;
