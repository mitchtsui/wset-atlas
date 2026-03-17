import { useState, useCallback } from "react";
import { PRACTICE_SQ_TOPICS, PRACTICE_SQ_GROUPS } from "../data/practiceSQ.js";

const GROUP_ICONS = {
  "Theory": "📚",
  "Red Grapes": "🔴",
  "White Grapes": "⚪",
  "Sparkling": "🥂",
  "Fortified & Sweet Wines": "🍷",
  "Europe": "🇪🇺",
  "Americas": "🌎",
  "Southern Hemisphere": "🌍",
};

/* ── Single SQ Card ── */
function SQCard({ q, a, marks, pts, n }) {
  const [show, setShow] = useState(false);

  function renderAnswer(text) {
    if (!text) return null;
    return text.split("\n").map((line, i) => (
      <p key={i} style={{ margin: "0 0 6px", fontSize: 12, lineHeight: "19px", color: "#444" }}>
        {line || "\u00A0"}
      </p>
    ));
  }

  return (
    <div style={{
      border: "1px solid #e8e4d8", borderRadius: 8,
      marginBottom: 10, background: "#fff", overflow: "hidden"
    }}>
      <div style={{ padding: "10px 12px", display: "flex", gap: 8, alignItems: "flex-start" }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: "#fff", background: "#b08020",
          borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0, marginTop: 1
        }}>{n}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, lineHeight: "19px", color: "#333", fontWeight: 500 }}>{q}</div>
          <div style={{ fontSize: 10, color: "#b08020", fontWeight: 600, marginTop: 4 }}>
            {marks} {marks === 1 ? "mark" : "marks"}
          </div>
        </div>
      </div>

      {!show && (
        <div style={{ padding: "0 12px 10px" }}>
          <button onClick={() => setShow(true)} style={{
            width: "100%", padding: "8px 0", border: "1px dashed #ccc", borderRadius: 6,
            background: "#fdfcfa", cursor: "pointer", fontSize: 11, color: "#888",
            fontFamily: "inherit", transition: "all .15s"
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#b08020"; e.target.style.color = "#b08020"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#ccc"; e.target.style.color = "#888"; }}
          >Tap to reveal answer</button>
        </div>
      )}

      {show && (
        <div style={{
          padding: "10px 12px 12px", borderTop: "1px solid #e8e4d8",
          background: "linear-gradient(180deg, #f8f6f0, #fdfcfa)"
        }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#2E7D32", fontWeight: 700, marginBottom: 6 }}>MODEL ANSWER</div>
          {renderAnswer(a)}
          {pts && pts.length > 0 && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #e8e4d8" }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#b08020", fontWeight: 700, marginBottom: 6 }}>KEY ANSWER POINTS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {pts.map((pt, i) => (
                  <span key={i} style={{
                    display: "inline-block", padding: "3px 8px", borderRadius: 12,
                    background: "#f0e8d0", color: "#8a6c20", fontSize: 10, fontWeight: 600,
                    border: "1px solid #e0d4b0"
                  }}>{pt}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Topic Accordion ── */
function TopicSection({ topic, isOpen, onToggle }) {
  const count = topic.questions.length;
  const totalMarks = topic.questions.reduce((s, q) => s + q.marks, 0);

  return (
    <div style={{ marginBottom: 6 }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px", border: "1px solid #e8e4d8", borderRadius: isOpen ? "8px 8px 0 0" : 8,
        background: isOpen ? `linear-gradient(135deg, ${topic.color}08, #fff)` : "#fff",
        cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
        borderBottom: isOpen ? `2px solid ${topic.color}40` : "1px solid #e8e4d8"
      }}>
        <span style={{ fontSize: 18 }}>{topic.icon}</span>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{topic.name}</div>
          <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>
            {count} question{count !== 1 ? "s" : ""} · {totalMarks} marks
          </div>
        </div>
        <span style={{
          fontSize: 16, color: topic.color, fontWeight: 700,
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform .2s"
        }}>▾</span>
      </button>

      {isOpen && (
        <div style={{
          border: "1px solid #e8e4d8", borderTop: "none",
          borderRadius: "0 0 8px 8px", padding: "12px 10px", background: "#fdfcfa"
        }}>
          {topic.questions.map((q, i) => (
            <SQCard key={i} n={i + 1} q={q.q} a={q.a} marks={q.marks} pts={q.pts} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Group Heading ── */
function GroupHeading({ name }) {
  return (
    <div style={{
      padding: "14px 0 6px", marginTop: 8,
      borderBottom: "1px solid #e0dcd0", marginBottom: 8,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: 16 }}>{GROUP_ICONS[name] || "📖"}</span>
      <h3 style={{
        margin: 0, fontSize: 11, letterSpacing: 3,
        color: "#b08020", fontWeight: 700, textTransform: "uppercase",
      }}>{name}</h3>
    </div>
  );
}

/* ── Subgroup Label (Aromatic / Less Aromatic) ── */
function SubgroupLabel({ name }) {
  return (
    <div style={{
      padding: "6px 0 4px", marginTop: 2, marginBottom: 4,
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <div style={{
        width: 16, height: 1, background: "#d0ccc0",
      }} />
      <span style={{
        fontSize: 9, letterSpacing: 2, color: "#999",
        fontWeight: 600, textTransform: "uppercase", fontStyle: "italic",
      }}>{name}</span>
      <div style={{
        flex: 1, height: 1, background: "#e8e4d8",
      }} />
    </div>
  );
}

/* ── Main Page ── */
export default function PracticeSQPage({ onBack }) {
  const [openTopics, setOpenTopics] = useState({});

  const toggle = useCallback((id) => {
    setOpenTopics(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const expandAll = () => {
    const all = {};
    PRACTICE_SQ_TOPICS.forEach(t => { all[t.id] = true; });
    setOpenTopics(all);
  };

  const collapseAll = () => setOpenTopics({});

  const totalQ = PRACTICE_SQ_TOPICS.reduce((s, t) => s + t.questions.length, 0);
  const totalMarks = PRACTICE_SQ_TOPICS.reduce((s, t) => s + t.questions.reduce((ss, q) => ss + q.marks, 0), 0);

  /* Build grouped structure with subgroup labels */
  const grouped = [];
  let currentGroup = null;
  let currentSubgroup = null;
  for (const topic of PRACTICE_SQ_TOPICS) {
    const g = topic.group || "Theory";
    const sg = topic.subgroup || null;

    if (g !== currentGroup) {
      grouped.push({ type: "heading", name: g });
      currentGroup = g;
      currentSubgroup = null;
    }
    if (sg && sg !== currentSubgroup) {
      grouped.push({ type: "subgroup", name: sg });
      currentSubgroup = sg;
    } else if (!sg && currentSubgroup) {
      currentSubgroup = null;
    }
    grouped.push({ type: "topic", topic });
  }

  return (
    <div className="fade-in" style={{ overflowY: "auto", height: "calc(100vh - 44px)" }}>
      {/* Header */}
      <div style={{
        textAlign: "center", padding: "24px 16px 16px",
        background: "linear-gradient(180deg, #f0ede4, #fdfcfa)"
      }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#b08020", fontWeight: 600 }}>PRACTICE SHORT QUESTIONS</div>
        <h1 className="page-title" style={{ marginTop: 6 }}>Written Exam Prep</h1>
        <p className="page-subtitle">
          Model answers with marking key points from Wine With Jimmy
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 300, color: "#b08020" }}>{totalQ}</div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: "#bbb" }}>QUESTIONS</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 300, color: "#b08020" }}>{PRACTICE_SQ_TOPICS.length}</div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: "#bbb" }}>TOPICS</div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 300, color: "#b08020" }}>{totalMarks}</div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: "#bbb" }}>TOTAL MARKS</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        padding: "10px 16px", display: "flex", gap: 8, justifyContent: "space-between",
        borderBottom: "1px solid #eee", background: "#fff", position: "sticky", top: 0, zIndex: 10
      }}>
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={expandAll} style={{
            padding: "5px 10px", border: "1px solid #ddd", borderRadius: 5,
            background: "#fff", cursor: "pointer", fontSize: 10, fontFamily: "inherit", color: "#666"
          }}>Expand All</button>
          <button onClick={collapseAll} style={{
            padding: "5px 10px", border: "1px solid #ddd", borderRadius: 5,
            background: "#fff", cursor: "pointer", fontSize: 10, fontFamily: "inherit", color: "#666"
          }}>Collapse All</button>
        </div>
      </div>

      {/* Grouped topic accordions */}
      <div style={{ padding: "6px 16px 30px" }}>
        {grouped.map((item, i) =>
          item.type === "heading" ? (
            <GroupHeading key={`g-${item.name}`} name={item.name} />
          ) : item.type === "subgroup" ? (
            <SubgroupLabel key={`sg-${item.name}`} name={item.name} />
          ) : (
            <TopicSection
              key={item.topic.id}
              topic={item.topic}
              isOpen={!!openTopics[item.topic.id]}
              onToggle={() => toggle(item.topic.id)}
            />
          )
        )}
      </div>
    </div>
  );
}
