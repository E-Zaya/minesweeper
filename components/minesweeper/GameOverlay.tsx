'use client';

import { useState, useEffect } from 'react';
import type { Language, Difficulty } from '@/lib/minesweeper/types';
import { t } from '@/lib/minesweeper/i18n';
import Confetti from './Confetti';

interface Props {
  status: 'won' | 'lost';
  time: number;
  playerName: string;
  language: Language;
  difficulty: Difficulty;
  onRetry: () => void;
  onSave: (name: string) => void;
  onBackToDifficulty: () => void;
}

function diffLabel(diff: Difficulty, lang: Language): string {
  if (lang === 'jp') return { beginner: '初級', intermediate: '中級', expert: '上級' }[diff];
  return { beginner: 'Beginner', intermediate: 'Intermediate', expert: 'Expert' }[diff];
}

export default function GameOverlay({
  status,
  time,
  playerName,
  language,
  difficulty,
  onRetry,
  onSave,
  onBackToDifficulty,
}: Props) {
  const [name, setName] = useState(playerName);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

  const isWin = status === 'won';

  const handleSave = () => {
    if (saved) return;
    onSave(name.trim() || playerName);
    setSaved(true);
  };

  const buildShareText = (): string => {
    const diff = diffLabel(difficulty, language);
    if (language === 'jp') {
      return `🎉 地雷 Minesweeper をクリア！\n${diff} を ${time}秒 でクリアしました 💣\n${t(language, 'challenge')}`;
    }
    return `🎉 Cleared 地雷 Minesweeper!\n${diff} in ${time}s 💣\n${t(language, 'challenge')}`;
  };

  const handleShareX = () => {
    const text = buildShareText();
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(intent, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    const text = buildShareText() + (typeof window !== 'undefined' ? `\n${window.location.href}` : '');
    try {
      if (navigator.share) {
        await navigator.share({ text, title: '地雷 Minesweeper' });
        return;
      }
    } catch {
      // user cancelled native share — fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {isWin && mounted && <Confetti count={90} />}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isWin ? 'win-bg' : ''}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      >
        <div
          className={`neu-card p-7 rounded-2xl w-full max-w-sm flex flex-col gap-5 ${
            isWin ? 'animate-pop-in' : 'animate-shake'
          }`}
        >
          {/* Status header */}
          <div className="text-center">
            <div className="text-6xl mb-2">{isWin ? '🎉' : '💥'}</div>
            <h2
              className={`font-serif text-3xl tracking-wider ${
                isWin ? 'text-matcha' : 'text-app-strong'
              }`}
            >
              {isWin ? t(language, 'youWin') : t(language, 'gameOver')}
            </h2>
            <p className="font-mono text-xs text-muted mt-1.5 tracking-widest uppercase">
              {diffLabel(difficulty, language)} · {playerName}
            </p>
          </div>

          {/* Time spotlight */}
          {isWin && (
            <div className="neu-inset px-5 py-4 rounded-xl flex items-end justify-center gap-1.5">
              <span className="font-serif text-xs text-muted mb-1.5 tracking-widest uppercase">
                {t(language, 'yourTime')}
              </span>
              <span className="font-mono text-5xl font-bold text-gold tabular-nums leading-none">
                {time}
              </span>
              <span className="font-serif text-lg text-soft mb-1">
                {t(language, 'seconds')}
              </span>
            </div>
          )}

          {!isWin && (
            <div className="text-center neu-inset px-5 py-3 rounded-xl">
              <p className="font-serif text-sm text-soft">
                {language === 'jp' ? `タイム ${time}秒` : `Time: ${time}s`}
              </p>
            </div>
          )}

          {/* Save score */}
          {isWin && !saved && (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                className="neu-input px-4 py-2.5 rounded-xl font-serif text-sm outline-none w-full
                           text-app placeholder:text-muted"
              />
              <button
                onClick={handleSave}
                className="neu-btn-primary py-2.5 px-4 rounded-xl font-serif tracking-wider
                           transition-all duration-200 active:scale-95"
              >
                💾 {t(language, 'saveScore')}
              </button>
            </div>
          )}

          {isWin && saved && (
            <div className="neu-inset py-2 rounded-xl text-center">
              <p className="font-serif text-sm text-matcha tracking-wide">
                ✓ {language === 'jp' ? '保存しました' : 'Score saved'}
              </p>
            </div>
          )}

          {/* Share buttons */}
          {isWin && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-current opacity-10" />
                <span className="font-serif text-xs text-muted tracking-widest uppercase">
                  {t(language, 'share')}
                </span>
                <div className="flex-1 h-px bg-current opacity-10" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShareX}
                  className="neu-btn-raised flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2
                             font-serif text-sm text-app transition-all duration-200 active:scale-95"
                >
                  <span className="font-bold">𝕏</span>
                  <span>Twitter</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="neu-btn-raised flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2
                             font-serif text-sm text-app transition-all duration-200 active:scale-95"
                >
                  <span>{copied ? '✓' : '📋'}</span>
                  <span>{copied ? t(language, 'copied') : t(language, 'copyLink')}</span>
                </button>
              </div>
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onBackToDifficulty}
              className="neu-btn-raised flex-1 py-2.5 px-3 rounded-xl font-serif text-sm text-soft
                         transition-all duration-200 active:scale-95"
            >
              ← {t(language, 'backToDifficulty')}
            </button>
            <button
              onClick={onRetry}
              className={`neu-btn-${isWin ? 'raised' : 'primary'} flex-1 py-2.5 px-3 rounded-xl font-serif text-sm tracking-wider
                         transition-all duration-200 active:scale-95
                         ${isWin ? 'text-app' : ''}`}
            >
              ↻ {t(language, 'retry')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
