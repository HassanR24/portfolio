import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";

import { heroStats, projectCards, storyTimeline, techSections } from "../data";
import { AlternatingTimeline, Page, SectionTitle, Shell } from "./layout";
import { SiteHeader } from "./site-header";
import ShellSection from "./shell";

function StorySection() {
  return (
    <section className="space-y-5">
      <SectionTitle
        label="Journey"
        title="From Finance to Full Stack"
        intro="My professional journey began in finance, but a passion for technology led me to software development. This timeline highlights the experiences, challenges, and milestones that have shaped me into the developer I am today."
      />
      <AlternatingTimeline
        items={storyTimeline}
        getKey={(item) => item.year}
        renderItem={(item) => (
          <div className="rounded-[30px] border border-emerald-300/10 bg-[#1e293b] p-6 sm:p-7 lg:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-200/80">
              {item.year}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-50">
              {item.title}
            </h3>
            {"award" in item && item.award ? (
              <div className="mt-4 inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                Award: {item.award}
              </div>
            ) : null}
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
        intro="These are live products and client-facing builds. Each card links to the live work and shows the stack and tools behind it."
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
            className="group rounded-[30px] border border-emerald-300/10 bg-[#1e293b] p-6 transition hover:-translate-y-1 hover:border-emerald-300/20 hover:bg-slate-700/80"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-emerald-200/80">
                {project.category}
              </p>
              <ExternalLink
                size={16}
                className="text-slate-400 transition group-hover:text-emerald-200"
              />
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-50">
              {project.title}
            </h3>
            <p className="mt-3 leading-8 text-slate-300">{project.summary}</p>

            <div className="mt-5 border-t border-emerald-300/10 pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-500">
                stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-300/10 bg-[#1e293b] px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-emerald-300/10 pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-500">
                tools
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-300/10 bg-[#1e293b] px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-5 border-t border-emerald-300/10 pt-4 text-sm leading-7 text-slate-300">
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
        title="The tools I use to build"
        intro="These are the tools and technologies I use to build scalable web applications, REST APIs, and workflow automation tools. I focus on writing clean, maintainable code that delivers reliable and efficient solutions."
      />
      <Shell>
        <div className="flex items-center gap-2 border-b border-emerald-300/10 px-5 py-4 sm:px-6">
          <Code2 size={16} className="text-emerald-300" />
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-400">
            stack overview
          </p>
        </div>
        <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
          {Object.entries(techSections).map(([category, items]) => (
            <div
              key={category}
              className="rounded-[26px] border border-emerald-300/10 bg-[#1e293b] p-5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-200/80">
                {category}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-300/10 bg-[#1e293b] px-3 py-1 text-xs text-slate-200"
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
      <div className="grid gap-4 lg:grid-cols-4">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[28px] border border-emerald-300/10 bg-[#1e293b] p-5"
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
      <div className="relative z-10 px-0 pb-0 pt-0">
        <SiteHeader />
      </div>

      <ShellSection />

      <StorySection />
      <ProjectCardsSection />
      <TechStackSection />
      <FooterSection />
    </Page>
  );
}
