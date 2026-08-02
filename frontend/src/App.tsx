import React from "react";
import Version1Old from "./versions/v1_old/Version1Old";
import Version2WithoutAi from "./versions/v2_new_without_ai/Version2WithoutAi";

export function App() {
  const [activeVersion, setActiveVersion] = React.useState<"v1" | "v2">("v2");

  return (
    <div>
      {/* Top Floating Master Version Switcher Bar */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 py-2.5 px-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Version Switcher
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveVersion("v1")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVersion === "v1"
                ? "bg-slate-700 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Old UI
          </button>

          <button
            onClick={() => setActiveVersion("v2")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeVersion === "v2"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-emerald-300"
            }`}
          >
            New UI
          </button>
        </div>
      </div>

      {/* Render Active Folder Version */}
      {activeVersion === "v1" && <Version1Old />}
      {activeVersion === "v2" && <Version2WithoutAi />}
    </div>
  );
}

export default App;
