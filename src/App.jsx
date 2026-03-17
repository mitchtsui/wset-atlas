import { useState } from "react";
import { DATA } from "./data/countries.js";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Home from "./components/Home.jsx";
import Country from "./components/Country.jsx";
import SparklingPage from "./components/SparklingPage.jsx";
import FortifiedPage from "./components/FortifiedPage.jsx";
import PracticeExam from "./components/PracticeExam.jsx";
import ComparePage from "./components/ComparePage.jsx";
import PracticeSQPage from "./components/PracticeSQPage.jsx";
import { useProgress } from "./hooks/useProgress.js";

export default function App() {
  const [pg, setPg] = useState("home");
  const [sel, setSel] = useState(null);
  const { recordMC, recordSQ, recordExam, resetProgress, stats } = useProgress();

  const c = pg !== "home" && pg !== "sparkling" && pg !== "fortified" && pg !== "exam" && pg !== "compare" && pg !== "practicesq" ? DATA[pg] : null;
  const pgT = pg === "sparkling" ? "Sparkling Wines" : pg === "fortified" ? "Fortified Wines" : pg === "exam" ? "Practice MCs" : pg === "compare" ? "Compare Regions" : pg === "practicesq" ? "Practice Short Qs" : null;

  const goHome = () => { setPg("home"); setSel(null); };

  return (
    <div style={{ fontFamily: "'Crimson Text','Georgia',serif", background: "#fdfcfa", color: "#444", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav role="navigation" aria-label="Breadcrumb" style={{ padding: "8px 12px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, background: "#fff", flexWrap: "wrap" }}>
        <button onClick={goHome} style={{ background: "none", border: "none", color: pg === "home" ? "#333" : "#999", cursor: "pointer", fontSize: 14, fontFamily: "inherit", fontWeight: 700, letterSpacing: 1 }}>WSET L3</button>
        {pgT && <><span style={{ color: "#ddd" }}>/</span><span style={{ color: "#333", fontSize: 13 }}>{pgT}</span></>}
        {c && <><span style={{ color: "#ddd" }}>/</span><span style={{ color: "#333", fontSize: 13 }}>{c.name}</span>{sel && <><span style={{ color: "#ddd" }}>/</span><span style={{ color: c.color, fontSize: 12, fontWeight: 600, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", verticalAlign: "middle" }}>{sel.name}</span></>}</>}
        {pg !== "home" && <button onClick={goHome} className="back-btn" style={{ marginLeft: "auto" }} aria-label="Back to home">← Back</button>}
      </nav>
      <main style={{ flex: 1, overflowY: pg === "home" || pg === "sparkling" || pg === "fortified" || pg === "exam" || pg === "compare" || pg === "practicesq" ? "auto" : "hidden" }} role="main">
        <ErrorBoundary onReset={goHome}>
          {pg === "home" ? (
            <Home onGo={k => { setPg(k); setSel(null); }} stats={stats} onResetProgress={resetProgress} />
          ) : pg === "sparkling" ? (
            <SparklingPage />
          ) : pg === "fortified" ? (
            <FortifiedPage />
          ) : pg === "exam" ? (
            <PracticeExam onBack={goHome} onRecordExam={recordExam} />
          ) : pg === "practicesq" ? (
            <PracticeSQPage onBack={goHome} />
          ) : pg === "compare" ? (
            <ComparePage onBack={goHome} />
          ) : (
            <Country ck={pg} c={c} sel={sel} onSel={setSel} onMC={recordMC} onSQ={recordSQ} />
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}
