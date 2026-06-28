import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(6px)" },
};

export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-14"
    >
      {children}
    </motion.section>
  );
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-emerald-200/80">
      <span className="h-px w-10 bg-gradient-to-r from-emerald-300/70 to-transparent" />
      <span>{label}</span>
      <span className="font-mono text-emerald-100/70">&lt;/&gt;</span>
    </div>
  );
}

export function SectionTitle({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="max-w-4xl">
      <SectionLabel label={label} />
      <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
        {intro}
      </p>
    </div>
  );
}

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[34px] border border-emerald-300/10 bg-[#1e293b]/80 backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export function ScrollToTopButton() {
  return (
    <motion.button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full border border-emerald-300/15 bg-[#1e293b]/90 text-emerald-200 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:border-emerald-300/25 hover:bg-[#334155] sm:bottom-6 sm:right-6"
    >
      <ArrowUp size={18} />
    </motion.button>
  );
}

export function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView] as const;
}

type AlternatingTimelineProps<T> = {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number, isLeft: boolean) => ReactNode;
};

export function AlternatingTimeline<T>({
  items,
  getKey,
  renderItem,
}: AlternatingTimelineProps<T>) {
  return (
    <div className="relative mt-10">
      <div className="absolute left-4 top-0 h-full w-px bg-emerald-300/15 md:left-1/2 md:-translate-x-px" />
      <div className="grid gap-8">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={getKey(item, index)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.38, delay: 0.04 * index }}
              className="relative grid gap-5 md:grid-cols-[1fr_72px_1fr] md:items-center"
            >
              <div
                className={
                  isLeft
                    ? "hidden md:block md:col-start-3"
                    : "hidden md:block md:col-start-1"
                }
              />
              <div className="relative z-10 flex justify-start md:col-start-2 md:justify-center">
                <div className="grid h-5 w-5 place-items-center rounded-full border border-emerald-300/25 bg-slate-950/90 shadow-[0_0_0_8px_rgba(16,185,129,0.08)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-200" />
                </div>
              </div>
              <div
                className={`${isLeft ? "md:col-start-1 md:pr-6" : "md:col-start-3 md:pl-6"} md:max-w-[560px]`}
              >
                {renderItem(item, index, isLeft)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
