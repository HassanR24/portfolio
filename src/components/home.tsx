import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Code2,
  ExternalLink,
  Rocket,
  TerminalSquare,
  Workflow,
} from "lucide-react";

import {
  currentFocus,
  heroHighlights,
  heroStats,
  projectCards,
  storyTimeline,
  techSections,
  terminalTranscript,
} from "../data";
import {
  AlternatingTimeline,
  Page,
  SectionTitle,
  Shell,
  useInViewOnce,
} from "./layout";
import { SiteHeader } from "./site-header";

const heroImage = new URL("../../my_image.jpg", import.meta.url).href;

function TypewriterTerminal() {
  const [ref, isInView] = useInViewOnce<HTMLDivElement>(0.35);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const startRef = useRef(false);

  useEffect(() => {
    if (isInView && !startRef.current) {
      startRef.current = true;
      setLineIndex(0);
      setCharIndex(0);
      setCompletedLines([]);
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (lineIndex >= terminalTranscript.length) {
      return;
    }

    const line = terminalTranscript[lineIndex];
    const fullText = `$ ${line.command}\n${line.output}`;

    if (charIndex < fullText.length) {
      const timeout = window.setTimeout(
        () => setCharIndex((value) => value + 1),
        10,
      );
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setCompletedLines((value) => [...value, fullText]);
      setLineIndex((value) => value + 1);
      setCharIndex(0);
    }, 200);
    return () => window.clearTimeout(timeout);
  }, [charIndex, isInView, lineIndex]);

  const currentLine = terminalTranscript[lineIndex];
  const currentText = currentLine
    ? `$ ${currentLine.command}\n${currentLine.output}`
    : "";
  const currentRender = currentText.slice(0, charIndex);

  return (
    <div ref={ref} className="grid gap-3">
      {completedLines.map((text, index) => (
        <div
          key={index}
          className="rounded-[28px] border border-cyan-300/10 bg-slate-950/20 p-4 sm:p-5"
        >
          <p className="whitespace-pre-wrap font-mono text-sm leading-7 text-cyan-100">
            {text}
          </p>
        </div>
      ))}

      {isInView && lineIndex < terminalTranscript.length ? (
        <div className="rounded-[28px] border border-cyan-300/10 bg-slate-950/20 p-4 sm:p-5">
          <p className="whitespace-pre-wrap font-mono text-sm leading-7 text-cyan-100">
            {currentRender}
            <span className="caret-blink ml-1 inline-block align-middle text-cyan-200">
              ▌
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}

function StorySection() {
  return (
    <section className="space-y-5">
      <SectionTitle
        label="Timeline"
        title="The story so far"
        intro="The timeline now alternates cleanly across the page so each entry gets its own side, with the opposite side left empty for breathing room."
      />
      <AlternatingTimeline
        items={storyTimeline}
        getKey={(item) => item.year}
        renderItem={(item) => (
          <div className="rounded-[30px] border border-cyan-300/10 bg-slate-950/20 p-6 sm:p-7 lg:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-200/80">
              {item.year}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-50">
              {item.title}
            </h3>
            <p className="mt-4 leading-8 text-slate-300">{item.text}</p>
          </div>
        )}
      />
    </section>
  );
}

function ProjectCardsSection() {
  return (
    <section id="projects" className="scroll-mt-28 space-y-5">
      <SectionTitle
        label="Projects"
        title="Live builds with a clear job to do"
        intro="These are real products and client-facing builds. Each card links to the live work and shows the stack and tools behind it without turning the section into a pitch deck."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {projectCards.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.38, delay: 0.04 * index }}
            className="group rounded-[30px] border border-cyan-300/10 bg-slate-950/20 p-6 transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-slate-950/30"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-cyan-200/80">
                {project.category}
              </p>
              <ExternalLink
                size={16}
                className="text-slate-400 transition group-hover:text-cyan-200"
              />
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-50">
              {project.title}
            </h3>
            <p className="mt-3 leading-8 text-slate-300">{project.summary}</p>

            <div className="mt-5 border-t border-cyan-300/10 pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-500">
                stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-300/10 bg-slate-950/20 px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-cyan-300/10 pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-500">
                tools
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-300/10 bg-slate-950/20 px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-5 border-t border-cyan-300/10 pt-4 text-sm leading-7 text-slate-300">
              {project.note}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function TechStackSection() {
  return (
    <section id="stack" className="scroll-mt-28 space-y-5">
      <SectionTitle
        label="Tech stack"
        title="Tools grouped by the layer they serve"
        intro="Instead of dumping a long JSON block, the stack is arranged into readable groups so the layout stays tight and the information is easier to scan."
      />
      <Shell>
        <div className="flex items-center gap-2 border-b border-cyan-300/10 px-5 py-4 sm:px-6">
          <Code2 size={16} className="text-cyan-300" />
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-400">
            stack overview
          </p>
        </div>
        <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
          {Object.entries(techSections).map(([category, items]) => (
            <div
              key={category}
              className="rounded-[26px] border border-cyan-300/10 bg-slate-950/20 p-5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-200/80">
                {category}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-300/10 bg-slate-950/20 px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[30px] border border-cyan-300/10 bg-slate-950/20 p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Workflow size={16} className="text-cyan-300" />
            Working style
          </div>
          <div className="mt-4 grid gap-3">
            {heroHighlights.map((item) => (
              <div
                key={item}
                className="border-b border-cyan-300/10 py-4 leading-7 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-cyan-300/10 bg-slate-950/20 p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Rocket size={16} className="text-fuchsia-300" />
            Current focus
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentFocus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-300/10 bg-slate-950/20 px-3 py-1 text-xs text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-2xl leading-8 text-slate-300">
            I like work where the backend, frontend, automation, and deployment
            all matter equally. The goal is not just to make something work, but
            to make it feel premium and easy to use.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[28px] border border-cyan-300/10 bg-slate-950/20 p-5"
          >
            <p className="text-3xl font-semibold tracking-tight text-slate-50">
              {stat.value}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <Page>
      <section className="relative min-h-[100svh] overflow-hidden bg-slate-950/20 px-0 pb-8 pt-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.14),_transparent_28%),radial-gradient(circle_at_20%_30%,_rgba(244,114,182,0.08),_transparent_18%)]" />
        <div className="relative z-10 px-0 pb-0 pt-0">
          <SiteHeader />
        </div>

        <div className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-between gap-8 px-0">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-fuchsia-300/15 bg-fuchsia-400/10 px-3 py-1 text-xs font-medium text-fuchsia-100">
                  $ Terminal
                </span>
                <span className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  print("Hello Python")
                </span>
                <span className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  &lt;&gt; React &lt;/&gt;
                </span>
                <span className="rounded-full border border-amber-300/15 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-100">
                  {"{JSON}"}
                </span>
                <span className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
                  API Integration
                </span>
              </div>

              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl lg:text-7xl lg:leading-[0.9]">
                Hassan Raza
              </h1>

              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I build software that turns messy workflows into something calm
                and usable. I started in accounting, learned programming through
                disciplined practice, and grew through freelance scraping,
                Django systems, React products, and production delivery. The
                result is a practical stack that connects raw data, backend
                logic, frontend polish, and deployment into one coherent
                product.
              </p>

              <div className="flex flex-wrap items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.34em] text-slate-400">
                <span className="rounded-full border border-cyan-300/15 bg-slate-950/20 px-3 py-1">
                  $ npm run build
                </span>
                <span className="rounded-full border border-cyan-300/15 bg-slate-950/20 px-3 py-1">
                  $ python manage.py runserver
                </span>
                <span className="rounded-full border border-cyan-300/15 bg-slate-950/20 px-3 py-1">
                  $ git push origin main
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("terminal")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-200 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(56,189,248,0.14)] transition hover:-translate-y-0.5"
                >
                  Explore the story <ArrowRight size={16} className="ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-cyan-300/12 bg-slate-950/20 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
                >
                  See projects
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentFocus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-300/10 bg-slate-950/20 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -inset-4 rounded-[36px] bg-[radial-gradient(circle,_rgba(56,189,248,0.18),_transparent_65%)] blur-3xl" />
              <img
                src={heroImage}
                alt="Hassan Raza portrait"
                className="relative h-[420px] w-full max-w-[420px] rounded-[32px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.38)] sm:h-[500px] lg:h-[540px]"
              />
            </div>
          </div>

          <div className="mx-auto flex flex-col items-center gap-3 text-center text-slate-300">
            <motion.button
              type="button"
              onClick={() =>
                document
                  .getElementById("terminal")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="grid place-items-center rounded-full border border-cyan-300/10 bg-slate-950/20 p-3 text-cyan-200"
            >
              <ChevronDown size={20} />
            </motion.button>
            <p className="text-xs uppercase tracking-[0.34em] text-slate-500">
              scroll down
            </p>
          </div>
        </div>
      </section>

      <section id="terminal" className="scroll-mt-28 space-y-5">
        <SectionTitle
          label="Terminal"
          title="A live terminal-style introduction"
          intro="This section types a little faster now, so it feels like a live shell session instead of a slow demo block."
        />
        <Shell>
          <div className="flex items-center gap-2 border-b border-cyan-300/10 px-5 py-4 sm:px-6">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
              <TerminalSquare size={14} />
              <span>portfolio.session</span>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <TypewriterTerminal />
          </div>
        </Shell>
      </section>

      <StorySection />
      <ProjectCardsSection />
      <TechStackSection />

      <FooterSection />
    </Page>
  );
}
