'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import type { Language, Theme } from '@/lib/minesweeper/types';
import { t } from '@/lib/minesweeper/i18n';

interface Props {
  onStart: (name: string, language: Language, theme: Theme) => void;
}

export default function NameEntry({ onStart }: Props) {
  const [name, setName] = useState('');
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  // Apply theme immediately so the user sees the toggle take effect
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
  }, [theme]);

  const handleStart = () => {
    const trimmed = name.trim() || t(lang, 'placeholderName');
    onStart(trimmed, lang, theme);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="neu-card p-8 rounded-2xl w-full max-w-sm flex flex-col gap-6">
        {/* Logo */}
        <div className="text-center">
          <h1 className="font-serif text-4xl tracking-widest mb-1 text-stone-800 dark:text-washi-100">
            地雷
          </h1>
          <p className="font-mono text-sm tracking-[0.3em] text-stone-500 dark:text-stone-400 uppercase">
            Minesweeper
          </p>
        </div>

        {/* Name input */}
        <div className="flex flex-col gap-2">
          <label className="font-serif text-sm text-stone-600 dark:text-washi-200 tracking-wide">
            {t(lang, 'enterName')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t(lang, 'placeholderName')}
            maxLength={20}
            className="neu-input px-4 py-3 rounded-xl font-serif text-base outline-none w-full
                       text-stone-800 dark:text-washi-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
          />
        </div>

        {/* Toggles row */}
        <div className="flex gap-3 justify-between">
          {/* Language toggle */}
          <div className="flex flex-col gap-1.5 flex-1">
            <span className="font-serif text-xs text-stone-600 dark:text-washi-200 tracking-wide">
              {t(lang, 'language')}
            </span>
            <div className="neu-toggle-group flex rounded-lg overflow-hidden p-1 gap-1">
              <button
                onClick={() => setLang('en')}
                className={`flex-1 py-1.5 text-sm font-mono rounded-md transition-all duration-200 ${
                  lang === 'en' ? 'neu-toggle-active' : 'neu-toggle-inactive'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('jp')}
                className={`flex-1 py-1.5 text-sm font-serif rounded-md transition-all duration-200 ${
                  lang === 'jp' ? 'neu-toggle-active' : 'neu-toggle-inactive'
                }`}
              >
                JP
              </button>
            </div>
          </div>

          {/* Theme toggle */}
          <div className="flex flex-col gap-1.5 flex-1">
            <span className="font-serif text-xs text-stone-600 dark:text-washi-200 tracking-wide">
              {t(lang, 'theme')}
            </span>
            <div className="neu-toggle-group flex rounded-lg overflow-hidden p-1 gap-1">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  theme === 'light' ? 'neu-toggle-active' : 'neu-toggle-inactive'
                }`}
                aria-label="Light mode"
              >
                ☀
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  theme === 'dark' ? 'neu-toggle-active' : 'neu-toggle-inactive'
                }`}
                aria-label="Dark mode"
              >
                ☽
              </button>
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          className="neu-btn-primary py-3 px-6 rounded-xl font-serif text-lg tracking-widest
                     transition-all duration-200 active:scale-95"
        >
          {t(lang, 'start')}
        </button>
      </div>
    </div>
  );
}
