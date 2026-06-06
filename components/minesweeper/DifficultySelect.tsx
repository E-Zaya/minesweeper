'use client';

import type { Difficulty, Language } from '@/lib/minesweeper/types';
import { DIFFICULTY_CONFIG } from '@/lib/minesweeper/types';
import { t } from '@/lib/minesweeper/i18n';

interface Props {
  language: Language;
  onSelect: (diff: Difficulty) => void;
  onLeaderboard: () => void;
  onBack: () => void;
}

const DIFFICULTIES: { key: Difficulty; jp: string; kanji: string }[] = [
  { key: 'beginner', jp: '初級', kanji: '初' },
  { key: 'intermediate', jp: '中級', kanji: '中' },
  { key: 'expert', jp: '上級', kanji: '上' },
];

export default function DifficultySelect({ language, onSelect, onLeaderboard, onBack }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl tracking-widest text-app-strong">
            {t(language, 'selectDifficulty')}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {DIFFICULTIES.map(({ key, jp, kanji }) => {
            const cfg = DIFFICULTY_CONFIG[key];
            const label = language === 'jp' ? jp : t(language, key as 'beginner' | 'intermediate' | 'expert');
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className="neu-btn-raised px-5 py-4 rounded-xl text-left transition-all duration-200
                           active:scale-95 flex items-center gap-4 group"
              >
                <div className="neu-inset w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                  <span className="font-serif text-2xl text-matcha">{kanji}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-serif text-lg text-app group-hover:text-matcha transition-colors">
                    {label}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {cfg.rows}×{cfg.cols} · {cfg.mines} {language === 'jp' ? '地雷' : 'mines'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="neu-btn-raised flex-1 py-2 px-3 rounded-lg font-serif text-sm text-soft
                       transition-all duration-200 active:scale-95"
          >
            ← {t(language, 'back')}
          </button>
          <button
            onClick={onLeaderboard}
            className="neu-btn-raised flex-1 py-2 px-3 rounded-lg font-serif text-sm text-soft
                       transition-all duration-200 active:scale-95"
          >
            🏆 {t(language, 'leaderboard')}
          </button>
        </div>
      </div>
    </div>
  );
}
