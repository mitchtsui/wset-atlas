import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "wset_atlas_progress";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not load progress:", e);
  }
  return { mc: {}, sq: {}, exam: [] };
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save progress:", e);
  }
}

/**
 * Progress data shape:
 * {
 *   mc: { "ch1_q0": { correct: true, attempts: 2 }, ... },
 *   sq: { "ch1_q0": { revealed: true }, ... },
 *   exam: [ { date: "2026-03-16", score: 8, total: 10, pct: 80, ms: 300000 }, ... ]
 * }
 */
export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  // Persist on every change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const recordMC = useCallback((chapterNum, qIndex, isCorrect) => {
    const key = `ch${chapterNum}_mc${qIndex}`;
    setProgress(prev => {
      const existing = prev.mc[key] || { correct: false, attempts: 0 };
      return {
        ...prev,
        mc: {
          ...prev.mc,
          [key]: {
            correct: existing.correct || isCorrect,
            attempts: existing.attempts + 1,
          },
        },
      };
    });
  }, []);

  const recordSQ = useCallback((chapterNum, qIndex) => {
    const key = `ch${chapterNum}_sq${qIndex}`;
    setProgress(prev => ({
      ...prev,
      sq: { ...prev.sq, [key]: { revealed: true } },
    }));
  }, []);

  const recordExam = useCallback((score, total, timeMs) => {
    setProgress(prev => ({
      ...prev,
      exam: [
        ...prev.exam,
        {
          date: new Date().toISOString().slice(0, 10),
          score,
          total,
          pct: Math.round((score / total) * 100),
          ms: timeMs,
        },
      ],
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const empty = { mc: {}, sq: {}, exam: [] };
    setProgress(empty);
    saveProgress(empty);
  }, []);

  // Derived stats
  const mcKeys = Object.keys(progress.mc);
  const mcCorrect = mcKeys.filter(k => progress.mc[k].correct).length;
  const mcTotal = mcKeys.length;
  const sqRevealed = Object.keys(progress.sq).length;
  const examCount = progress.exam.length;
  const bestExam = progress.exam.length
    ? Math.max(...progress.exam.map(e => e.pct))
    : null;

  return {
    progress,
    recordMC,
    recordSQ,
    recordExam,
    resetProgress,
    stats: { mcCorrect, mcTotal, sqRevealed, examCount, bestExam },
  };
}
