'use client';

import type { Language } from '@/lib/minesweeper/types';
import { t } from '@/lib/minesweeper/i18n';

interface Props {
  language: Language;
  onClose: () => void;
}

export default function HowToPlay({ language, onClose }: Props) {
  const rules = [
    { icon: '👆', text: t(language, 'rule1') },
    { icon: '🚩', text: t(language, 'rule2') },
    { icon: '⚡', text: t(language, 'rule3') },
    { icon: '🏆', text: t(language, 'rule4') },
    { icon: '🛡', text: t(language, 'rule5') },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="neu-card rounded-2xl w-full max-w-md flex flex-col gap-4 p-6 animate-fade-in"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl tracking-widest text-app-strong flex items-center gap-2">
            <span>📖</span>
            <span>{t(language, 'howToPlay')}</span>
          </h2>
          <button
            onClick={onClose}
            className="neu-btn-icon w-8 h-8 rounded-lg text-muted text-lg active:scale-90 transition-all"
            aria-label={t(language, 'close')}
          >
            ✕
          </button>
        </div>

        {/* Rules */}
        <div className="flex flex-col gap-2 overflow-y-auto">
          {rules.map((rule, i) => (
            <div key={i} className="neu-inset px-3 py-2.5 rounded-lg flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">{rule.icon}</span>
              <p className="font-serif text-sm text-app leading-relaxed">{rule.text}</p>
            </div>
          ))}

          {/* Tips */}
          <h3 className="font-serif text-sm text-soft tracking-widest uppercase mt-2 px-1">
            {t(language, 'tips')}
          </h3>
          <div className="flex flex-col gap-2">
            <div className="px-3 py-2 rounded-lg flex items-start gap-3">
              <span className="text-sm shrink-0">💡</span>
              <p className="font-serif text-xs text-soft leading-relaxed">{t(language, 'tip1')}</p>
            </div>
            <div className="px-3 py-2 rounded-lg flex items-start gap-3">
              <span className="text-sm shrink-0">💡</span>
              <p className="font-serif text-xs text-soft leading-relaxed">{t(language, 'tip2')}</p>
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="neu-btn-primary py-2.5 rounded-xl font-serif tracking-wider active:scale-95 transition-all mt-1"
        >
          {t(language, 'got_it')}
        </button>
      </div>
    </div>
  );
}
