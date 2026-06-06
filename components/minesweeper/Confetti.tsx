'use client';

import { useMemo } from 'react';

const COLORS = ['#B68B3F', '#D4A85A', '#7BA17B', '#C9828C', '#4A5FA8', '#EBE3D5'];

interface Props {
  count?: number;
}

export default function Confetti({ count = 80 }: Props) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 2.5 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 8,
        shape: Math.random() > 0.5 ? 'square' : 'circle',
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 1.6}px`,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
