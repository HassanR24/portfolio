import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import { HomePage } from "./components/home";
import { ResumePage } from "./components/resume";

function App() {
  const location = useLocation();

  return (
    <div className="p-12 relative min-h-screen overflow-x-hidden bg-[#050816] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.12),_transparent_24%),radial-gradient(circle_at_50%_118%,_rgba(251,191,36,0.10),_transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black_54%,transparent_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08),_transparent_65%)] blur-3xl" />

      <main className="w-full px-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
