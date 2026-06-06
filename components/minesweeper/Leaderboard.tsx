'use client';

import { useState } from 'react';
import type { Difficulty, Language, ScoreEntry } from '@/lib/minesweeper/types';
import { t } from '@/lib/minesweeper/i18n';

interface Props {
  language: Language;
  getByDifficulty: (d: Difficulty) => ScoreEntry[];
  onClose: () => void;
}

const TABS: { key: Difficulty; en: string; jp: string }[] = [
  { key: 'beginner', en: 'Beginner', jp: '初級' },
  { key: 'intermediate', en: 'Intermediate', jp: '中級' },
  { key: 'expert', en: 'Expert', jp: '上級' },
];

function medalEmoji(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
}

export default function Leaderboard({ language, getByDifficulty, onClose }: Props) {
  const [tab, setTab] = useState<Difficulty>('beginner');
  const scores = getByDifficulty(tab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="neu-card rounded-2xl w-full max-w-md flex flex-col animate-fade-in"
           style={{ maxHeight: '90vh' }}>
        {/* Title bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="font-serif text-xl tracking-widest text-app-strong">
            {t(language, 'leaderboard')}
          </h2>
          <button
            onClick={onClose}
            className="neu-btn-icon w-8 h-8 rounded-lg text-muted text-lg
                       transition-all duration-150 active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Difficulty tabs */}
        <div className="flex gap-2 px-6 pb-4">
          {TABS.map(({ key, en, jp }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-1.5 rounded-lg font-serif text-sm transition-all duration-200
                ${tab === key ? 'neu-toggle-active' : 'neu-toggle-inactive'}`}
            >
              {language === 'jp' ? jp : en}
            </button>
          ))}
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2rem_1fr_5rem_5rem] gap-2 px-6 pb-2 border-b border-stone-200 dark:border-stone-700">
          {(['rank', 'name', 'time', 'date'] as const).map((col) => (
            <span key={col} className="font-serif text-xs text-muted tracking-wider">
              {t(language, col)}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto px-6 py-2 flex flex-col gap-1">
          {scores.length === 0 ? (
            <p className="font-serif text-center text-muted py-8">
              {t(language, 'noScores')}
            </p>
          ) : (
            scores.map((entry, i) => {
              const rank = i + 1;
              const medal = medalEmoji(rank);
              return (
                <div
                  key={`${entry.name}-${entry.time}-${entry.date}`}
                  className={`grid grid-cols-[2rem_1fr_5rem_5rem] gap-2 py-2 rounded-lg px-1
                    transition-colors ${rank <= 3 ? 'bg-amber-50 dark:bg-amber-950/20' : ''}`}
                >
                  <span className="font-mono text-sm text-soft">
                    {medal ?? `#${rank}`}
                  </span>
                  <span className="font-serif text-sm text-app-strong truncate">
                    {entry.name}
                  </span>
                  <span className="font-mono text-sm text-app tabular-nums">
                    {entry.time}{t(language, 'seconds')}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {entry.date}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="px-6 pb-5 pt-2">
          <button
            onClick={onClose}
            className="w-full neu-btn-raised py-2 rounded-xl font-serif text-sm
                       text-app transition-all duration-200 active:scale-95"
          >
            {t(language, 'close')}
          </button>
        </div>
      </div>
    </div>
  );
}
