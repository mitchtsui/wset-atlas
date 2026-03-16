import { useState } from "react";
import { DATA } from "../data/countries.js";
import { GMAP, GUIDE } from "../data/guide.js";

// Build flat list of all regions with country info
const ALL_REGIONS = [];
for (const [ck, c] of Object.entries(DATA)) {
  for (const r of c.regions) {
    ALL_REGIONS.push({ id: r.id, name: r.name, country: c.name, color: c.color, grapes: r.grapes, keyFact: r.keyFact, r });
  }
}
ALL_REGIONS.sort((a, b) => a.name.localeCompare(b.name));

function CompareRow({ label, left, right }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr", borderBottom: "1px solid #eee", fontSize: 11.5 }}>
      <div style={{ padding: "8px 8px", background: "#f8f6f0", fontWeight: 700, color: "#888", fontSize: 9, letterSpacing: 1, textTransform: "uppercase", display: "flex", alignItems: "flex-start" }}>{label}</div>
      <div style={{ padding: "8px 10px", color: "#555", lineHeight: "18px", borderRight: "1px solid #eee" }}>{left || "—"}</div>
      <div style={{ padding: "8px 10px", color: "#555", lineHeight: "18px" }}>{right || "—"}</div>
    </div>
  );
}

function RegionPicker({ value, onChange, otherId, label, color }) {
  return (
    <div>
      <div style={{ fontSize: 9, letterSpacing: 2, color: color || "#999", fontWeight: 700, marginBottom: 4 }}>{label}</div>
      <select value={value || ""} onChange={e => onChange(e.target.value || null)}
        style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd", fontSize: 13, fontFamily: "inherit", color: "#333", background: "#fff", cursor: "pointer" }}>
        <option value="">Select a region...</option>
        {ALL_REGIONS.map(r => (
          <option key={r.id} value={r.id} disabled={r.id === otherId}>
            {r.name} ({r.country})
          </option>
        ))}
      </select>
    </div>
  );
}

function GrapeRow({ label, grapes }) {
  if (!grapes) return "—";
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {grapes.r.map(g => <span key={g} style={{ display: "inline-block", padding: "1px 7px", borderRadius: 10, fontSize: 10, fontWeight: 600, background: "#f8e8e8", color: "#904040", border: "1px solid #e0c0c0" }}>{g}</span>)}
      {grapes.w.map(g => <span key={g} style={{ display: "inline-block", padding: "1px 7px", borderRadius: 10, fontSize: 10, fontWeight: 600, background: "#f0f0e0", color: "#606020", border: "1px solid #d8d8b8" }}>{g}</span>)}
    </div>
  );
}

export default function ComparePage({ onBack }) {
  const [leftId, setLeftId] = useState(null);
  const [rightId, setRightId] = useState(null);

  const leftRegion = leftId ? ALL_REGIONS.find(r => r.id === leftId) : null;
  const rightRegion = rightId ? ALL_REGIONS.find(r => r.id === rightId) : null;
  const leftGuide = leftId && GMAP[leftId] ? GUIDE[GMAP[leftId]] : null;
  const rightGuide = rightId && GMAP[rightId] ? GUIDE[GMAP[rightId]] : null;

  const hasBoth = leftRegion && rightRegion;

  // Extract climate summary (first sentence or up to "Key Influences")
  const climateSummary = (text) => {
    if (!text) return "—";
    const cut = text.indexOf("Key Influences");
    return cut > 0 ? text.slice(0, cut).trim() : text.slice(0, 200).trim() + (text.length > 200 ? "..." : "");
  };

  // Extract soil summary (first ~150 chars)
  const soilSummary = (text) => {
    if (!text) return "—";
    return text.slice(0, 200).trim() + (text.length > 200 ? "..." : "");
  };

  return (
    <div className="fade-in" style={{ overflowY: "auto", height: "calc(100vh - 44px)", padding: "0 0 30px" }}>
      <div style={{ textAlign: "center", padding: "18px 16px 12px", background: "linear-gradient(180deg,#f0f8f0,#fdfcfa)" }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#4a8a4a" }}>STUDY TOOL</div>
        <h1 style={{ fontSize: 22, fontWeight: 400, color: "#333", margin: "4px 0" }}>Compare Regions</h1>
        <p style={{ fontSize: 11, color: "#888", margin: "2px auto 0", maxWidth: 400 }}>Select two regions to compare their climate, grapes, soil, and winemaking side by side.</p>
      </div>

      <div style={{ padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <RegionPicker value={leftId} onChange={setLeftId} otherId={rightId} label="REGION A" color="#4a8a4a" />
        <RegionPicker value={rightId} onChange={setRightId} otherId={leftId} label="REGION B" color="#6868b0" />
      </div>

      {hasBoth && (
        <div style={{ padding: "8px 16px" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr", borderBottom: "2px solid #ddd", marginBottom: 0 }}>
            <div />
            <div style={{ padding: "8px 10px", fontWeight: 700, color: leftRegion.color || "#333", fontSize: 14 }}>
              {leftRegion.name}
              <div style={{ fontSize: 10, color: "#999", fontWeight: 400 }}>{leftRegion.country}</div>
            </div>
            <div style={{ padding: "8px 10px", fontWeight: 700, color: rightRegion.color || "#333", fontSize: 14 }}>
              {rightRegion.name}
              <div style={{ fontSize: 10, color: "#999", fontWeight: 400 }}>{rightRegion.country}</div>
            </div>
          </div>

          {/* Comparison rows */}
          <div style={{ border: "1px solid #e8e4d8", borderRadius: 6, overflow: "hidden" }}>
            <CompareRow label="Climate"
              left={climateSummary(leftGuide?.climate || leftRegion.r.climate)}
              right={climateSummary(rightGuide?.climate || rightRegion.r.climate)}
            />
            <CompareRow label="Key Grapes"
              left={<GrapeRow grapes={leftRegion.grapes} />}
              right={<GrapeRow grapes={rightRegion.grapes} />}
            />
            <CompareRow label="Soil"
              left={soilSummary(leftGuide?.soil)}
              right={soilSummary(rightGuide?.soil)}
            />
            <CompareRow label="Winemaking"
              left={leftGuide?.winemaking ? leftGuide.winemaking.slice(0, 250).trim() + "..." : "—"}
              right={rightGuide?.winemaking ? rightGuide.winemaking.slice(0, 250).trim() + "..." : "—"}
            />
            <CompareRow label="Key Fact"
              left={leftRegion.keyFact}
              right={rightRegion.keyFact}
            />
            {(leftGuide?.keyWines || rightGuide?.keyWines) && (
              <CompareRow label="Key Wines"
                left={leftGuide?.keyWines ? leftGuide.keyWines.map(w => w.wine).join(", ") : "—"}
                right={rightGuide?.keyWines ? rightGuide.keyWines.map(w => w.wine).join(", ") : "—"}
              />
            )}
          </div>

          {/* Exam-style comparison prompt */}
          <div style={{ marginTop: 12, background: "#f8f6ee", border: "1px solid #e8e4d0", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#b08020", fontWeight: 700, marginBottom: 4 }}>PRACTICE QUESTION</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: "20px" }}>
              Compare and contrast the climate, key grape varieties, and winemaking techniques of <b>{leftRegion.name}</b> and <b>{rightRegion.name}</b>. What are the key differences that a WSET L3 student should know?
            </div>
          </div>
        </div>
      )}

      {!hasBoth && (
        <div style={{ textAlign: "center", padding: "40px 16px", color: "#ccc" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>⚖️</div>
          <div style={{ fontSize: 13 }}>Select two regions above to begin comparing</div>
        </div>
      )}

      <div style={{ padding: "16px", textAlign: "center" }}>
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
      </div>
    </div>
  );
}
