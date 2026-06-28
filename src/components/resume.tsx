import {
  ArrowLeft,
  BrainCircuit,
  CalendarDays,
  Code2,
  Mail,
  MapPin,
  Workflow,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

import {
  currentFocus,
  heroStats,
  profileLinks,
  resumeSummary,
  resumeTimeline,
} from "../data";
import { AlternatingTimeline, Page, SectionTitle } from "./layout";

export function ResumePage() {
  return (
    <Page>
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden rounded-[38px] border border-emerald-300/10 bg-[#1e293b] p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),radial-gradient(circle_at_18%_38%,_rgba(52,211,153,0.06),_transparent_16%)]" />
          <div className="relative space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/12 bg-[#0f172a]/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/25 hover:bg-[#334155]"
            >
              <ArrowLeft size={15} />
              Back home
            </Link>

            <div className="max-w-4xl">
              <div className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-emerald-200/80">
                <span className="h-px w-10 bg-gradient-to-r from-emerald-300/70 to-transparent" />
                <span>Resume</span>
                <span className="font-mono text-emerald-100/70">&lt;/&gt;</span>
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl">
                Hassan Raza
              </h1>
              <p className="mt-3 text-lg font-medium text-slate-300">
                Full Stack Developer · Django · React · Python · Scraping ·
                Deployment
              </p>
            </div>

            <p className="max-w-3xl leading-8 text-slate-300">
              {resumeSummary}
            </p>

            <div className="flex flex-wrap gap-2">
              {currentFocus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-emerald-300/10 bg-[#1e293b] px-3 py-1 text-xs text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/Hassan_Raza_Resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(16,185,129,0.2)] transition hover:-translate-y-0.5 hover:from-emerald-400 hover:to-emerald-200"
              >
                Download PDF
              </a>
              <button
                type="button"
                onClick={() =>
                  (window.location.href = `mailto:${profileLinks.email}`)
                }
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/12 bg-[#1e293b] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
              >
                Email
              </button>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    profileLinks.github,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/12 bg-[#1e293b] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
              >
                GitHub
              </button>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    profileLinks.linkedin,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/12 bg-[#1e293b] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
              >
                LinkedIn
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[30px] border border-emerald-300/10 bg-[#1e293b] p-7 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <MapPin size={16} className="text-emerald-300" />
              Contact details
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center gap-3 border-b border-emerald-300/10 py-4">
                <Mail size={16} className="shrink-0 text-amber-300" />
                <a
                  className="break-all hover:text-white"
                  href={`mailto:${profileLinks.email}`}
                >
                  {profileLinks.email}
                </a>
              </div>
              <div className="flex items-center gap-3 border-b border-emerald-300/10 py-4">
                <FaGithub size={16} className="shrink-0 text-slate-200" />
                <a
                  className="hover:text-white"
                  href={profileLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/HassanR24
                </a>
              </div>
              <div className="flex items-center gap-3 border-b border-emerald-300/10 py-4">
                <FaLinkedin size={16} className="shrink-0 text-emerald-300" />
                <a
                  className="hover:text-white"
                  href={profileLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/hassanr410/
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-emerald-300/10 bg-[#1e293b] p-7 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <BrainCircuit size={16} className="text-emerald-300" />
              Snapshot
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-emerald-300/10 bg-[#1e293b] p-4"
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
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle
          label="Professional history"
          title="Timeline resume"
          intro="The resume timeline alternates left and right, with generous spacing and larger cards so the content has room to breathe."
        />
        <AlternatingTimeline
          items={resumeTimeline}
          getKey={(entry) => `${entry.company}-${entry.role}`}
          renderItem={(entry) => (
            <div className="rounded-[30px] border border-emerald-300/10 bg-[#1e293b] p-6 sm:p-7 lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-200/80">
                {entry.company}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-50">
                {entry.role}
              </h3>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/10 bg-[#1e293b] px-4 py-2 text-sm text-slate-300">
                <CalendarDays size={14} />
                {entry.period}
              </div>
              <p className="mt-5 leading-8 text-slate-300">{entry.summary}</p>
              <div className="mt-5 border-t border-emerald-300/10 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.34em] text-slate-500">
                  What I did
                </p>
                <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 border-b border-emerald-300/10 py-3"
                    >
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[30px] border border-emerald-300/10 bg-[#1e293b] p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Code2 size={16} className="text-emerald-300" />
            Languages and systems
          </div>
          <div className="mt-4 grid gap-3 text-slate-300">
            <div className="border-b border-emerald-300/10 py-4">
              Python, JavaScript, TypeScript, PHP
            </div>
            <div className="border-b border-emerald-300/10 py-4">
              Django, React, Next.js, Tailwind CSS
            </div>
            <div className="border-b border-emerald-300/10 py-4">
              Scrapy, Playwright, Selenium, Celery
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-emerald-300/10 bg-[#1e293b] p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Workflow size={16} className="text-amber-300" />
            What this timeline shows
          </div>
          <p className="mt-4 leading-8 text-slate-300">
            The layout is meant to feel like a living history strip: the center
            line, alternating entries, and slower, roomier cards all help the
            page read as narrative instead of a wall of boxes.
          </p>
        </div>
      </section>
    </Page>
  );
}
