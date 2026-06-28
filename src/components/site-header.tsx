import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import heroImage from "../../my_image.jpg";
export function SiteHeader() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden p-6">
      <div className="absolute inset-0" />

      <div className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-between gap-8 px-0">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              <span className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
                $ warp
              </span>
              <span className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
                print("Hello Python")
              </span>
              <span className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
                &lt;&gt; React &lt;/&gt;
              </span>
              <span className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
                {"{ JSON }"}
              </span>
              <span className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
                API Integration
              </span>
            </div>
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <h1 className="max-w-2xl text-6xl font-black tracking-tight text-slate-50 sm:text-7xl lg:text-[5.25rem] lg:leading-[0.88]">
                Hassan
              </h1>
              <h1 className="max-w-2xl text-[2.75rem] font-extrabold tracking-tight text-slate-100 sm:text-[3.8rem] lg:text-[4.75rem] lg:leading-[0.9]">
                Raza
              </h1>
              <p className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.34em] text-emerald-200 sm:text-base lg:text-left">
                Full Stack Developer (Django + React)
              </p>
            </div>

            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0 lg:text-left">
              I build softwares that turn messy workflows into something calm
              and usable. I'm a Full Stack Developer with a strong foundation in
              frameworks like Django and React. I build scalable web
              applications, REST APIs, and workflow automation tools that solve
              real business problems. Whether it's developing enterprise
              systems, integrating third-party services, or creating intuitive
              user experiences.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[0.72rem] uppercase tracking-[0.34em] text-slate-400 lg:justify-start">
              <span className="rounded-full border border-emerald-300/15 bg-[#1e293b] px-3 py-1">
                $ npm run build
              </span>
              <span className="rounded-full border border-emerald-300/15 bg-[#1e293b] px-3 py-1">
                $ python manage.py runserver
              </span>
              <span className="rounded-full border border-emerald-300/15 bg-[#1e293b] px-3 py-1">
                $ git push origin main
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("terminal")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(16,185,129,0.2)] transition hover:-translate-y-0.5 hover:from-emerald-400 hover:to-emerald-200"
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
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/12 bg-[#1e293b] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
              >
                See projects
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = "/resume")}
                className="inline-flex items-center justify-center rounded-full border border-emerald-300/12 bg-[#1e293b] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5"
              >
                See Resume
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-4 rounded-[36px] bg-[radial-gradient(circle,_rgba(16,185,129,0.18),_transparent_65%)] blur-3xl" />
            <img
              src={heroImage}
              alt="Hassan Raza portrait"
              className="relative h-[360px] w-full max-w-[360px] rounded-[32px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.38)] sm:h-[500px] sm:max-w-[420px] lg:h-[540px]"
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
            className="grid place-items-center rounded-full border border-emerald-300/10 bg-[#1e293b] p-3 text-emerald-200"
          >
            <ChevronDown size={20} />
          </motion.button>
          <p className="text-xs uppercase tracking-[0.34em] text-slate-500">
            scroll down
          </p>
        </div>
      </div>
    </section>
  );
}
