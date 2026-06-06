'use client';

import { useState, useCallback } from 'react';
import type { ScoreEntry, Difficulty } from '@/lib/minesweeper/types';

const STORAGE_KEY = 'minesweeper_leaderboard';
const TOP_N = 20;

function loadScores(): ScoreEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScoreEntry[]) : [];
  } catch {
    return [];
  }
}

function saveScores(scores: ScoreEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // storage full — silently ignore
  }
}

export function useLeaderboard() {
  const [scores, setScores] = useState<ScoreEntry[]>(() => loadScores());

  const addScore = useCallback((entry: ScoreEntry): number => {
    const all = loadScores();
    const withNew = [...all, entry];
    const forDiff = withNew
      .filter((s) => s.difficulty === entry.difficulty)
      .sort((a, b) => a.time - b.time)
      .slice(0, TOP_N);
    const other = withNew.filter((s) => s.difficulty !== entry.difficulty);
    const merged = [...other, ...forDiff].sort((a, b) => {
      const diffOrder = ['beginner', 'intermediate', 'expert'];
      if (a.difficulty !== b.difficulty)
        return diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty);
      return a.time - b.time;
    });
    saveScores(merged);
    setScores(merged);
    const rank = forDiff.findIndex(
      (s) => s.name === entry.name && s.time === entry.time && s.date === entry.date
    );
    return rank + 1;
  }, []);

  const getByDifficulty = useCallback(
    (diff: Difficulty): ScoreEntry[] =>
      scores.filter((s) => s.difficulty === diff).sort((a, b) => a.time - b.time).slice(0, TOP_N),
    [scores]
  );

  const refresh = useCallback(() => {
    setScores(loadScores());
  }, []);

  return { scores, addScore, getByDifficulty, refresh };
}
