import { useState, useEffect, useRef, useCallback } from "react";
import { GUIDE } from "../data/guide.js";

/* Gather all MC questions with chapter info */
function getAllMC() {
  const all = [];
  for (const [ch, data] of Object.entries(GUIDE)) {
    for (let i = 0; i < (data.mc || []).length; i++) {
      all.push({ ...data.mc[i], chapter: ch, chName: data.name, idx: i });
    }
  }
  return all;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const EXAM_SIZES = [10, 20, 30];
const TIME_LIMITS = { 10: 10, 20: 18, 30: 25 }; // minutes

export default function PracticeExam({ onBack, onRecordExam }) {
  const [phase, setPhase] = useState("setup"); // setup | active | review
  const [size, setSize] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [timeLimit, setTimeLimit] = useState(null);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (phase === "active" && startTime) {
      timerRef.current = setInterval(() => {
        const e = Date.now() - startTime;
        setElapsed(e);
        if (timeLimit && e >= timeLimit) {
          clearInterval(timerRef.current);
          setPhase("review");
        }
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [phase, startTime, timeLimit]);

  const startExam = useCallback((timed) => {
    const all = getAllMC();
    const pool = shuffle(all).slice(0, size);
    setQuestions(pool);
    setAnswers({});
    setCurrent(0);
    setStartTime(Date.now());
    setTimeLimit(timed ? TIME_LIMITS[size] * 60 * 1000 : null);
    setPhase("active");
  }, [size]);

  const selectAnswer = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return; // already answered
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const finishExam = () => {
    clearInterval(timerRef.current);
    const finalElapsed = Date.now() - startTime;
    setElapsed(finalElapsed);
    setPhase("review");
    // Record to progress
    const score = questions.reduce((acc, q, i) => {
      const ai = "abcd".indexOf(q.a);
      return acc + (answers[i] === ai ? 1 : 0);
    }, 0);
    if (onRecordExam) onRecordExam(score, questions.length, finalElapsed);
  };

  const score = questions.reduce((acc, q, i) => {
    const ai = "abcd".indexOf(q.a);
    return acc + (answers[i] === ai ? 1 : 0);
  }, 0);
  const answered = Object.keys(answers).length;
  const remaining = timeLimit ? Math.max(0, timeLimit - elapsed) : null;

  /* ---- SETUP SCREEN ---- */
  if (phase === "setup") {
    return (
      <div className="exam-page fade-in">
        <div className="exam-header">
          <div className="section-label" style={{ color: "#6060b0" }}>PRACTICE EXAM</div>
          <h1 className="page-title">Test Your Knowledge</h1>
          <p className="page-subtitle">Randomised multiple-choice questions from all 26 chapters</p>
        </div>
        <div className="exam-setup">
          <div className="exam-setup-section">
            <div className="section-label">NUMBER OF QUESTIONS</div>
            <div className="exam-size-row">
              {EXAM_SIZES.map(n => (
                <button key={n} className={`exam-size-btn ${size === n ? "active" : ""}`}
                  onClick={() => setSize(n)}>{n}</button>
              ))}
            </div>
          </div>
          <div className="exam-setup-section">
            <div className="section-label">MODE</div>
            <div className="exam-mode-row">
              <button className="exam-mode-btn" onClick={() => startExam(true)}>
                <span className="exam-mode-icon">⏱</span>
                <b>Timed</b>
                <span className="exam-mode-detail">{TIME_LIMITS[size]} minutes</span>
              </button>
              <button className="exam-mode-btn" onClick={() => startExam(false)}>
                <span className="exam-mode-icon">📝</span>
                <b>Untimed</b>
                <span className="exam-mode-detail">No pressure</span>
              </button>
            </div>
          </div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      </div>
    );
  }

  /* ---- ACTIVE EXAM ---- */
  if (phase === "active") {
    const q = questions[current];
    const ai = "abcd".indexOf(q.a);
    const myAns = answers[current];
    const hasAnswered = myAns !== undefined;

    return (
      <div className="exam-page fade-in">
        {/* Top bar */}
        <div className="exam-topbar">
          <div className="exam-progress-text">
            <b>{current + 1}</b> / {questions.length}
            <span className="exam-score-inline"> · {score} correct</span>
          </div>
          {remaining !== null && (
            <div className={`exam-timer ${remaining < 60000 ? "urgent" : ""}`}>
              ⏱ {formatTime(remaining)}
            </div>
          )}
          {remaining === null && (
            <div className="exam-timer">{formatTime(elapsed)}</div>
          )}
        </div>

        {/* Progress bar */}
        <div className="exam-progress-bar">
          <div className="exam-progress-fill" style={{ width: `${(answered / questions.length) * 100}%` }} />
        </div>

        {/* Question */}
        <div className="exam-question-card">
          <div className="exam-chapter-label">{q.chName}</div>
          <div className="exam-question-text">{q.q}</div>
          <div className="exam-options" role="radiogroup">
            {q.o.map((opt, i) => {
              const letter = "abcd"[i];
              const isCorrect = i === ai;
              const isPicked = myAns === i;
              let cls = "exam-option";
              if (hasAnswered && isCorrect) cls += " correct";
              else if (isPicked && !isCorrect) cls += " wrong";

              return (
                <div key={i} className={cls} role="radio" aria-checked={isPicked} tabIndex={0}
                  onClick={() => selectAnswer(current, i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectAnswer(current, i); } }}
                >
                  <span className="exam-option-letter">{letter})</span> {opt}
                </div>
              );
            })}
          </div>
          {hasAnswered && q.e && (
            <div className="exam-explanation">
              <b>✓ {q.a})</b> {q.e}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="exam-nav">
          <button className="exam-nav-btn" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>← Prev</button>
          {current < questions.length - 1 ? (
            <button className="exam-nav-btn primary" onClick={() => setCurrent(c => c + 1)}>Next →</button>
          ) : (
            <button className="exam-nav-btn finish" onClick={finishExam}>Finish Exam</button>
          )}
        </div>

        {/* Question dots */}
        <div className="exam-dots">
          {questions.map((_, i) => {
            const a = answers[i];
            const isAns = a !== undefined && a === "abcd".indexOf(questions[i].a);
            const isWrong = a !== undefined && !isAns;
            return (
              <button key={i} className={`exam-dot ${i === current ? "current" : ""} ${isAns ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                onClick={() => setCurrent(i)} aria-label={`Question ${i + 1}`} />
            );
          })}
        </div>
      </div>
    );
  }

  /* ---- REVIEW SCREEN ---- */
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const passed = pct >= 55;

  return (
    <div className="exam-page fade-in">
      <div className="exam-header">
        <div className="section-label" style={{ color: passed ? "#2E7D32" : "#c03030" }}>
          {passed ? "PASSED" : "KEEP STUDYING"}
        </div>
        <h1 className="page-title">{score} / {questions.length}</h1>
        <div className="exam-result-stats">
          <span>{pct}%</span>
          <span>·</span>
          <span>{formatTime(elapsed)}</span>
          <span>·</span>
          <span>{passed ? "55%+ to pass" : "Need 55%"}</span>
        </div>
      </div>

      {/* Results by chapter */}
      <div className="exam-review-list">
        <div className="section-label">REVIEW ANSWERS</div>
        {questions.map((q, i) => {
          const ai = "abcd".indexOf(q.a);
          const myAns = answers[i];
          const correct = myAns === ai;
          return (
            <div key={i} className={`exam-review-item ${correct ? "correct" : "wrong"}`}>
              <div className="exam-review-header">
                <span className={`exam-review-badge ${correct ? "correct" : "wrong"}`}>
                  {correct ? "✓" : "✗"}
                </span>
                <span className="exam-review-chapter">{q.chName}</span>
              </div>
              <div className="exam-review-q">{q.q}</div>
              {!correct && (
                <div className="exam-review-answer">
                  Your answer: <b>{myAns !== undefined ? "abcd"[myAns] : "—"}</b> · Correct: <b>{q.a}</b>
                  {q.e && <div className="exam-review-explain">{q.e}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="exam-review-actions">
        <button className="exam-mode-btn" onClick={() => setPhase("setup")}>Try Again</button>
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
      </div>
    </div>
  );
}
