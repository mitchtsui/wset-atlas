import { CONTS, byC } from "../data/countries.js";
import { GUIDE } from "../data/guide.js";

function ProgressWidget({ stats, onReset }) {
  if (!stats || (stats.mcTotal === 0 && stats.sqRevealed === 0 && stats.examCount === 0)) return null;

  return (
    <div className="progress-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div className="section-label" style={{ marginBottom: 0 }}>YOUR PROGRESS</div>
        <button className="progress-reset" onClick={() => {
          if (confirm("Reset all progress? This cannot be undone.")) onReset();
        }}>Reset</button>
      </div>
      {stats.mcTotal > 0 && (
        <div className="progress-row">
          <span>MC Correct: {stats.mcCorrect}/{stats.mcTotal}</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${stats.mcTotal ? (stats.mcCorrect / stats.mcTotal) * 100 : 0}%` }} />
          </div>
        </div>
      )}
      {stats.sqRevealed > 0 && (
        <div className="progress-row">
          <span>SQ Revealed: {stats.sqRevealed}</span>
        </div>
      )}
      {stats.examCount > 0 && (
        <div className="progress-row">
          <span>Exams taken: {stats.examCount}</span>
          <span style={{ color: "#b08020", fontWeight: 600 }}>Best: {stats.bestExam}%</span>
        </div>
      )}
      {stats.weakChapters && stats.weakChapters.length > 0 && (
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid #e8e4d0" }}>
          <div style={{ fontSize: 9, letterSpacing: 1, color: "#c06040", fontWeight: 700, marginBottom: 4 }}>AREAS TO REVIEW</div>
          {stats.weakChapters.map(w => (
            <div key={w.ch} style={{ fontSize: 11, color: "#666", display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
              <span>{GUIDE[w.ch]?.name || `Ch ${w.ch}`}</span>
              <span style={{ color: w.pct < 50 ? "#c03030" : "#b08020", fontWeight: 600 }}>{w.correct}/{w.total} ({w.pct}%)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home({ onGo, stats, onResetProgress }) {
  return (
    <div className="fade-in">
      <div style={{ textAlign: "center", padding: "28px 16px 22px", background: "linear-gradient(180deg,#f8f6f0,#fdfcfa)" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#aaa", marginBottom: 6 }}>WINE & SPIRIT EDUCATION TRUST</div>
        <h1 className="page-title">Wine Regions of the World</h1>
        <p className="page-subtitle">Interactive study atlas with detailed maps, geographic features, village markers, and exam prep. Tap a country to explore.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(12px,4vw,28px)", marginTop: 16, flexWrap: "wrap" }}>
          {[{ n: "15", l: "Countries" }, { n: "70+", l: "Regions" }, { n: "150+", l: "Villages" }, { n: "250+", l: "Practice Q's" }].map(s =>
            <div key={s.l}>
              <div style={{ fontSize: 20, fontWeight: 300, color: "#b08020" }}>{s.n}</div>
              <div style={{ fontSize: 8, letterSpacing: 2, color: "#bbb" }}>{s.l}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── THEMATIC STUDY ── */}
      <div style={{ padding: "14px 20px 6px" }}>
        <h2 style={{ fontSize: 11, letterSpacing: 4, color: "#b08020", fontWeight: 600, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #eee" }}>THEMATIC STUDY</h2>
        <div className="card-grid">
          <div className="cc" onClick={() => onGo("exam")} style={{ background: "linear-gradient(135deg,#f0f0fa,#fff)" }}>
            <div style={{ padding: "12px 14px 10px" }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>🎯</div>
              <b style={{ fontSize: 13, color: "#446" }}>Practice Exam</b>
              <div style={{ fontSize: 9, color: "#88a", marginTop: 1 }}>Timed · Randomised · All regions</div>
            </div>
          </div>
          <div className="cc" onClick={() => onGo("compare")} style={{ background: "linear-gradient(135deg,#f0faf0,#fff)" }}>
            <div style={{ padding: "12px 14px 10px" }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>⚖️</div>
              <b style={{ fontSize: 13, color: "#363" }}>Compare Regions</b>
              <div style={{ fontSize: 9, color: "#8a8", marginTop: 1 }}>Side-by-side · Climate · Grapes · Soil</div>
            </div>
          </div>
        </div>

        <ProgressWidget stats={stats} onReset={onResetProgress} />
      </div>

      {/* ── SPARKLING & FORTIFIED WINES ── */}
      <div style={{ padding: "18px 20px 10px" }}>
        <h2 style={{ fontSize: 11, letterSpacing: 4, color: "#b08020", fontWeight: 600, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid #eee" }}>SPARKLING & FORTIFIED WINES</h2>
        <div className="card-grid">
          <div className="cc" onClick={() => onGo("sparkling")} style={{ background: "linear-gradient(135deg,#f0f6ff,#fff)" }}>
            <div style={{ padding: "12px 14px 10px" }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>🥂</div>
              <b style={{ fontSize: 13, color: "#336" }}>Sparkling Wines</b>
              <div style={{ fontSize: 9, color: "#8aa", marginTop: 1 }}>Methods · Champagne · Cava · Prosecco</div>
            </div>
          </div>
          <div className="cc" onClick={() => onGo("fortified")} style={{ background: "linear-gradient(135deg,#fff4f0,#fff)" }}>
            <div style={{ padding: "12px 14px 10px" }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>🍷</div>
              <b style={{ fontSize: 13, color: "#633" }}>Fortified Wines</b>
              <div style={{ fontSize: 9, color: "#a88", marginTop: 1 }}>Port · Sherry · Madeira · VDN</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STILL WINES ── */}
      <div style={{ padding: "18px 20px 0" }}>
        <h2 style={{ fontSize: 11, letterSpacing: 4, color: "#b08020", fontWeight: 600, marginBottom: 4, paddingBottom: 6, borderBottom: "1px solid #eee" }}>STILL WINES</h2>
      </div>
      {CONTS.map(co =>
        <div key={co} style={{ padding: "12px 20px 10px" }}>
          <h3 style={{ fontSize: 10, letterSpacing: 3, color: "#bbb", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>{co}</h3>
          <div className="card-grid">
            {byC[co].map(([k, c]) =>
              <div key={k} className="cc" onClick={() => onGo(k)}>
                <div style={{ padding: "12px 14px 8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                    <span style={{ fontSize: 15, fontWeight: 500, color: "#333" }}>{c.name}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#aaa" }}>{c.regions.length} region{c.regions.length > 1 ? "s" : ""}</div>
                </div>
                <div style={{ padding: "4px 14px 10px", display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {c.regions.slice(0, 3).map(r => <span key={r.id} className="region-preview">{r.name}</span>)}
                  {c.regions.length > 3 && <span style={{ fontSize: 9, color: "#ccc" }}>+{c.regions.length - 3}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
