'use client';

import type { Language, Difficulty } from '@/lib/minesweeper/types';
import { t } from '@/lib/minesweeper/i18n';

interface Props {
  minesLeft: number;
  elapsedTime: number;
  language: Language;
  difficulty: Difficulty;
  playerName: string;
  flagMode: boolean;
  gameOver: boolean;
  onReset: () => void;
  onLeaderboard: () => void;
  onHowToPlay: () => void;
  onBack: () => void;
  onFlagModeToggle: () => void;
}

function pad(n: number) {
  return String(Math.min(999, n)).padStart(3, '0');
}

const DIFF_KANJI: Record<Difficulty, string> = {
  beginner: '初',
  intermediate: '中',
  expert: '上',
};

export default function Header({
  minesLeft,
  elapsedTime,
  language,
  difficulty,
  playerName,
  flagMode,
  gameOver,
  onReset,
  onLeaderboard,
  onHowToPlay,
  onBack,
  onFlagModeToggle,
}: Props) {
  const diffLabel =
    language === 'jp'
      ? { beginner: '初級', intermediate: '中級', expert: '上級' }[difficulty]
      : t(language, difficulty as 'beginner' | 'intermediate' | 'expert');

  return (
    <>
      {/* ── MOBILE — top bar ── */}
      <header className="neu-header md:hidden w-full px-3 py-2.5 rounded-xl mb-3 flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="neu-btn-icon w-9 h-9 rounded-lg text-soft text-sm transition-all duration-150 active:scale-90"
          aria-label={t(language, 'back')}
        >
          ←
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-base">💣</span>
            <span className="font-mono text-base text-red-600 dark:text-red-400 tabular-nums">
              {pad(minesLeft)}
            </span>
          </div>
          <button
            onClick={onReset}
            className="neu-btn-icon w-11 h-11 rounded-xl text-2xl transition-all duration-150 active:scale-90"
            aria-label="Reset"
          >
            😊
          </button>
          <span className="font-mono text-base text-app tabular-nums">{pad(elapsedTime)}</span>
        </div>

        <button
          onClick={onHowToPlay}
          className="neu-btn-icon w-9 h-9 rounded-lg text-sm text-soft active:scale-90 transition-all"
          aria-label={language === 'jp' ? '遊び方' : 'How to play'}
        >
          ?
        </button>
      </header>

      {/* ── DESKTOP — vertical sidebar inside retro frame ── */}
      <aside className="hidden md:flex md:flex-col md:fixed md:left-6 md:top-1/2 md:-translate-y-1/2 md:w-60 md:z-30">
        <div className="retro-frame">
          <span className="screw-tl" />
          <span className="screw-br" />
          <span className="retro-label">PLAYER · STATS</span>
          <div className="retro-screen flex flex-col gap-3">
            {/* Player info */}
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] tracking-[0.25em] text-muted uppercase">
                PLAYER
              </span>
              <span className="font-serif text-lg text-app-strong truncate">{playerName}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="neu-inset w-7 h-7 rounded-md flex items-center justify-center font-serif text-sm text-matcha shrink-0">
                  {DIFF_KANJI[difficulty]}
                </span>
                <span className="font-serif text-xs text-soft">{diffLabel}</span>
              </div>
            </div>

            <div className="h-px bg-current opacity-10" />

            {/* Mine counter */}
            <div className="neu-inset px-3 py-2.5 rounded-lg flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-base">💣</span>
                <span className="font-serif text-[10px] text-muted tracking-wider uppercase">
                  {t(language, 'mines')}
                </span>
              </span>
              <span className="font-mono text-xl text-red-600 dark:text-red-400 tabular-nums">
                {pad(minesLeft)}
              </span>
            </div>

            {/* Timer */}
            <div className="neu-inset px-3 py-2.5 rounded-lg flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-base">⏱</span>
                <span className="font-serif text-[10px] text-muted tracking-wider uppercase">
                  {t(language, 'time')}
                </span>
              </span>
              <span className="font-mono text-xl text-app tabular-nums">{pad(elapsedTime)}</span>
            </div>

            <div className="h-px bg-current opacity-10" />

            {/* Reset */}
            <button
              onClick={onReset}
              className="neu-btn-raised py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className="text-lg">😊</span>
              <span className="font-serif text-sm text-app">{t(language, 'retry')}</span>
            </button>

            {/* Leaderboard */}
            <button
              onClick={onLeaderboard}
              className="neu-btn-raised py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>🏆</span>
              <span className="font-serif text-sm text-soft">{t(language, 'leaderboard')}</span>
            </button>

            {/* How to play */}
            <button
              onClick={onHowToPlay}
              className="neu-btn-raised py-2 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>📖</span>
              <span className="font-serif text-sm text-soft">{t(language, 'howToPlay')}</span>
            </button>

            {/* Back */}
            <button
              onClick={onBack}
              className="neu-btn-subtle py-1.5 rounded-lg font-serif text-xs text-muted hover:text-app transition-colors"
            >
              ← {t(language, 'difficultyLabel')}
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE flag-mode sticky bottom bar ── */}
      {!gameOver && (
        <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 neu-card px-2 py-2 rounded-2xl flex gap-1 items-center">
          <span className="px-2 font-serif text-[10px] text-muted tracking-widest uppercase">
            {language === 'jp' ? 'モード' : 'Mode'}
          </span>
          <button
            onClick={() => flagMode && onFlagModeToggle()}
            className={`px-4 py-2 rounded-xl font-serif text-sm transition-all duration-200 flex items-center ${
              !flagMode ? 'neu-mode-active' : 'neu-mode-inactive'
            }`}
          >
            <span>{language === 'jp' ? '開く' : 'Reveal'}</span>
          </button>
          <button
            onClick={() => !flagMode && onFlagModeToggle()}
            className={`px-4 py-2 rounded-xl font-serif text-sm transition-all duration-200 flex items-center gap-1.5 ${
              flagMode ? 'neu-mode-active' : 'neu-mode-inactive'
            }`}
          >
            <span>🚩</span>
            <span>{language === 'jp' ? '旗' : 'Flag'}</span>
          </button>
        </div>
      )}
    </>
  );
}
