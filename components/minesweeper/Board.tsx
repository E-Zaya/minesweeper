'use client';

import { useRef, useEffect, useState } from 'react';
import type { Cell as CellType, Difficulty } from '@/lib/minesweeper/types';
import { DIFFICULTY_CONFIG } from '@/lib/minesweeper/types';
import CellComponent from './Cell';

interface Props {
  board: CellType[][];
  difficulty: Difficulty;
  gameOver: boolean;
  flagMode: boolean;
  onReveal: (r: number, c: number) => void;
  onFlag: (r: number, c: number) => void;
  onChord: (r: number, c: number) => void;
}

// Total pixel overhead consumed by retro-frame (12px) + retro-screen (10px) padding on each side
const FRAME_PAD_H = (12 + 10) * 2;      // 44px horizontal
const FRAME_PAD_V = (12 + 10) * 2 + 18; // 62px vertical (+ retro-label)
const GAP = 3;
const MIN_CELL = 28;
const MAX_CELL = 52;

export default function Board({ board, difficulty, gameOver, flagMode, onReveal, onFlag, onChord }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(36);
  const { cols, rows } = DIFFICULTY_CONFIG[difficulty];

  useEffect(() => {
    if (!wrapperRef.current) return;

    const compute = (w: number, h: number) => {
      const gridW = w - FRAME_PAD_H;
      const gridH = h - FRAME_PAD_V;
      const fromW = Math.floor((gridW - GAP * (cols - 1)) / cols);
      const fromH = Math.floor((gridH - GAP * (rows - 1)) / rows);
      // Fit both axes; clamp to reasonable range
      return Math.min(MAX_CELL, Math.max(MIN_CELL, Math.min(fromW, fromH)));
    };

    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        // contentRect = content box, excludes padding of the wrapper itself
        setCellSize(compute(e.contentRect.width, e.contentRect.height));
      }
    });
    ro.observe(wrapperRef.current);

    // Initial calculation
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    setCellSize(compute(width, height));

    return () => ro.disconnect();
  }, [cols, rows]);

  return (
    // wrapperRef fills the entire space the parent gives — this is what we measure
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center">
      <div className="retro-frame" style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <span className="screw-tl" />
        <span className="screw-br" />
        <span className="retro-label">BOARD</span>
        <div className="retro-screen">
          <div className="flex flex-col" style={{ gap: `${GAP}px` }}>
            {board.map(row => (
              <div key={row[0].row} className="flex" style={{ gap: `${GAP}px` }}>
                {row.map(cell => (
                  <CellComponent
                    key={`${cell.row}-${cell.col}`}
                    cell={cell}
                    cellSize={cellSize}
                    flagMode={flagMode}
                    onReveal={onReveal}
                    onFlag={onFlag}
                    onChord={onChord}
                    gameOver={gameOver}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
