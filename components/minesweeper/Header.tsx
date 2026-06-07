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

function timerColor(s: number) {
  if (s < 60)  return 'text-emerald-600 dark:text-emerald-400';
  if (s < 180) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

export default function Header({
  minesLeft, elapsedTime, language, difficulty, playerName,
  flagMode, gameOver, onReset, onLeaderboard, onHowToPlay, onBack, onFlagModeToggle,
}: Props) {
  const diffLabel =
    language === 'jp'
      ? { beginner: '初級', intermediate: '中級', expert: '上級' }[difficulty]
      : t(language, difficulty as 'beginner' | 'intermediate' | 'expert');

  return (
    <>
      {/* ── MOBILE top bar ── */}
      <header className="md:hidden shrink-0 w-full px-3 pt-3 pb-2 flex items-center gap-2">
        <div className="neu-header flex-1 px-3 py-2 rounded-xl flex items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="neu-btn-icon w-8 h-8 rounded-lg text-soft text-sm active:scale-90 transition-all"
            aria-label={t(language, 'back')}
          >
            ←
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-sm">💣</span>
              <span className={`font-mono text-sm tabular-nums ${minesLeft <= 0 ? 'animate-pulse text-red-600 dark:text-red-400' : 'text-red-600 dark:text-red-400'}`}>
                {pad(minesLeft)}
              </span>
            </div>

            <button
              onClick={onReset}
              className="neu-btn-icon w-10 h-10 rounded-xl text-xl active:scale-90 transition-all"
              aria-label="Reset"
            >
              {gameOver ? '😵' : '😊'}
            </button>

            <span className={`font-mono text-sm tabular-nums ${timerColor(elapsedTime)}`}>
              {pad(elapsedTime)}
            </span>
          </div>

          <button
            onClick={onHowToPlay}
            className="neu-btn-icon w-8 h-8 rounded-lg text-soft text-sm active:scale-90 transition-all font-mono"
            aria-label={language === 'jp' ? '遊び方' : 'How to play'}
          >
            ?
          </button>
        </div>
      </header>

      {/* ── DESKTOP sidebar — static flex item (not fixed!) ── */}
      <aside className="hidden md:flex flex-col shrink-0 w-52 h-screen overflow-y-auto p-3 gap-3">
        <div className="retro-frame flex-1 flex flex-col">
          <span className="screw-tl" />
          <span className="screw-br" />
          <span className="retro-label">PLAYER · STATS</span>
          <div className="retro-screen flex flex-col gap-3">

            {/* Player */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted uppercase">PLAYER</span>
              <span className="font-serif text-base text-app-strong truncate leading-tight">{playerName}</span>
              <div className="flex items-center gap-1.5">
                <span className="neu-inset w-6 h-6 rounded flex items-center justify-center font-serif text-xs text-matcha shrink-0">
                  {DIFF_KANJI[difficulty]}
                </span>
                <span className="font-serif text-xs text-soft">{diffLabel}</span>
              </div>
            </div>

            <div className="h-px bg-current opacity-10" />

            {/* Mines */}
            <div className="neu-inset px-3 py-2 rounded-lg flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="text-sm">💣</span>
                <span className="font-serif text-[9px] text-muted tracking-wider uppercase">{t(language, 'mines')}</span>
              </span>
              <span className={`font-mono text-lg tabular-nums ${minesLeft <= 0 ? 'animate-pulse text-red-600 dark:text-red-400' : 'text-red-600 dark:text-red-400'}`}>
                {pad(minesLeft)}
              </span>
            </div>

            {/* Timer */}
            <div className="neu-inset px-3 py-2 rounded-lg flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="text-sm">⏱</span>
                <span className="font-serif text-[9px] text-muted tracking-wider uppercase">{t(language, 'time')}</span>
              </span>
              <span className={`font-mono text-lg tabular-nums ${timerColor(elapsedTime)}`}>
                {pad(elapsedTime)}
              </span>
            </div>

            <div className="h-px bg-current opacity-10" />

            {/* Reset */}
            <button
              onClick={onReset}
              className="neu-btn-raised py-2 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className="text-base">{gameOver ? '😵' : '😊'}</span>
              <span className="font-serif text-sm text-app">{t(language, 'retry')}</span>
            </button>

            {/* Leaderboard */}
            <button
              onClick={onLeaderboard}
              className="neu-btn-raised py-2 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className="text-sm">🏆</span>
              <span className="font-serif text-sm text-soft">{t(language, 'leaderboard')}</span>
            </button>

            {/* How to play */}
            <button
              onClick={onHowToPlay}
              className="neu-btn-raised py-2 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className="text-sm">📖</span>
              <span className="font-serif text-sm text-soft">{t(language, 'howToPlay')}</span>
            </button>

            {/* Back */}
            <button
              onClick={onBack}
              className="py-1 rounded font-serif text-xs text-muted hover:text-soft transition-colors text-center"
            >
              ← {t(language, 'difficultyLabel')}
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE flag-mode bar (fixed, out of flow) ── */}
      {!gameOver && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-30 flex justify-center pb-safe">
          <div className="neu-card mx-3 mb-3 px-2 py-2 rounded-2xl flex gap-1 items-center shadow-lg">
            <span className="px-2 font-mono text-[9px] text-muted tracking-widest uppercase shrink-0">
              {language === 'jp' ? 'モード' : 'Mode'}
            </span>
            <button
              onClick={() => flagMode && onFlagModeToggle()}
              className={`flex-1 px-4 py-2.5 rounded-xl font-serif text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                !flagMode ? 'neu-mode-active' : 'neu-mode-inactive'
              }`}
            >
              <span className="text-base">👆</span>
              <span>{language === 'jp' ? '開く' : 'Reveal'}</span>
            </button>
            <button
              onClick={() => !flagMode && onFlagModeToggle()}
              className={`flex-1 px-4 py-2.5 rounded-xl font-serif text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                flagMode ? 'neu-mode-active' : 'neu-mode-inactive'
              }`}
            >
              <span className="text-base">🚩</span>
              <span>{language === 'jp' ? '旗' : 'Flag'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
