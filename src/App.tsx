import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import { HomePage } from "./components/home";
import { ResumePage } from "./components/resume";
import { ScrollToTopButton } from "./components/layout";

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0f172a] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(52,211,153,0.1),_transparent_24%),radial-gradient(circle_at_50%_118%,_rgba(15,23,42,0),_transparent_30%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black_54%,transparent_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.08),_transparent_65%)] blur-3xl" />

      <main className="w-full px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <ScrollToTopButton />
    </div>
  );
}

export default App;
