import { useNavigate } from "react-router-dom";

export function SiteHeader() {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 flex w-full items-center justify-between gap-4 px-0 pb-0 pt-0">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-3 text-left"
      >
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-slate-950/30 text-lg font-black tracking-[0.18em] text-cyan-200">
          {"{}"}
        </div>
        <div className="leading-tight">
          <p className="text-base font-semibold text-slate-50">Hassan Raza</p>
          <p className="text-[0.7rem] uppercase tracking-[0.34em] text-slate-400">
            Full Stack Developer
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => navigate("/resume")}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-200 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(56,189,248,0.14)] transition hover:-translate-y-0.5"
      >
        Resume
      </button>
    </div>
  );
}
