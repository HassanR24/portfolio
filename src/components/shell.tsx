import { Shell, SectionTitle, useInViewOnce } from "./layout";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { terminalTranscript } from "../data";

type LiveEntry = {
  id: string;
  command: string;
  output: string;
};

const helpOutput = [
  "Available sections:",
  ...terminalTranscript.map((entry) => `${entry.command}`),
  "",
  "Type nano <section_name> to see the section.",
].join("\n");

const initialHint = "--help to show available sections";

function buildLiveOutput(command: string) {
  const normalized = command.trim();

  if (!normalized) {
    return "";
  }

  if (normalized === "help" || normalized === "--help") {
    return helpOutput;
  }

  if (normalized === "whoami") {
    return terminalTranscript[0]?.output ?? "";
  }

  const nanoMatch = normalized.match(/^nano\s+(.+)$/);
  if (!nanoMatch) {
    return `Command not found: ${normalized}`;
  }

  const sectionName = nanoMatch[1];
  const transcriptEntry = terminalTranscript.find(
    (entry) => entry.command === sectionName,
  );

  if (!transcriptEntry) {
    return `No section named ${sectionName}`;
  }

  return transcriptEntry.output;
}

function TypewriterTerminal() {
  const [ref, isInView] = useInViewOnce<HTMLDivElement>(0.35);
  const [liveEntries, setLiveEntries] = useState<LiveEntry[]>([]);
  const [draftCommand, setDraftCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const draftBeforeHistoryRef = useRef("");

  useEffect(() => {
    if (!isInView) {
      return;
    }

    inputRef.current?.focus();
  }, [isInView]);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [liveEntries]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = draftCommand.trim();
    if (!command) {
      return;
    }

    if (command === "clear") {
      setLiveEntries([]);
      setDraftCommand("");
      setHistoryIndex(null);
      return;
    }

    const output = buildLiveOutput(command);
    setCommandHistory((value) => [...value, command]);
    setHistoryIndex(null);

    setLiveEntries((value) => [
      ...value,
      {
        id: `${command}-${Date.now()}`,
        command,
        output: output || "",
      },
    ]);
    setDraftCommand("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      return;
    }

    if (!commandHistory.length) {
      return;
    }

    event.preventDefault();

    if (historyIndex === null) {
      draftBeforeHistoryRef.current = draftCommand;
      const nextIndex = commandHistory.length - 1;
      setHistoryIndex(nextIndex);
      setDraftCommand(commandHistory[nextIndex] ?? "");
      return;
    }

    if (event.key === "ArrowUp") {
      const nextIndex = Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setDraftCommand(commandHistory[nextIndex] ?? "");
      return;
    }

    if (historyIndex < commandHistory.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setDraftCommand(commandHistory[nextIndex] ?? "");
      return;
    }

    setHistoryIndex(null);
    setDraftCommand(draftBeforeHistoryRef.current);
  }

  return (
    <div
      ref={ref}
      className="flex min-h-[540px] flex-col overflow-hidden rounded-[28px] border border-emerald-300/10 bg-[#0f172a]"
    >
      <div className="border-b border-emerald-300/10 bg-[#1e293b] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <TerminalSquare size={14} />
          <span>portfolio.session</span>
        </div>
      </div>

      {/* <div className="border-b border-emerald-300/10 bg-[#0f172a] px-5 py-3 text-xs font-mono text-emerald-200 sm:px-6">
        {initialHint}
      </div> */}

      <div
        ref={outputRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 sm:p-6"
      >
        <div className="grid gap-3">
          {liveEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="grid gap-2"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-sm leading-7 text-emerald-200">
                <span className="text-emerald-300">$</span>
                <span>{entry.command}</span>
              </div>
              <div className="whitespace-pre-wrap rounded-[22px] border border-emerald-300/10 bg-[#1e293b] p-4 font-mono text-sm leading-7 text-cyan-100 sm:p-5">
                {entry.output}
              </div>
            </motion.div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-auto border-t border-emerald-300/10 pt-4"
        >
          <div className="flex items-center gap-2 font-mono text-sm leading-7 text-emerald-200">
            <span className="text-emerald-300">$</span>
            <input
              ref={inputRef}
              value={draftCommand}
              onChange={(event) => setDraftCommand(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type --help"
              className="w-full bg-transparent text-cyan-100 outline-none placeholder:text-slate-500"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const ShellSection = () => {
  return (
    <section id="terminal" className="scroll-mt-28 space-y-5">
      <SectionTitle
        label="$ whoami"
        title="Meet the Developer"
        intro="No GUI needed. Just a few commands to learn about the developer behind this portfolio."
      />
      <Shell>
        <div className="p-5 sm:p-6">
          <TypewriterTerminal />
        </div>
      </Shell>
    </section>
  );
};

export default ShellSection;
