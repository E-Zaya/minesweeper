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

const MIN_CELL = 36;

export default function Board({ board, difficulty, gameOver, flagMode, onReveal, onFlag, onChord }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(MIN_CELL);
  const { cols } = DIFFICULTY_CONFIG[difficulty];

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const gap = 3;
      const computed = Math.floor((w - gap * (cols - 1)) / cols);
      setCellSize(Math.max(MIN_CELL, computed));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [cols]);

  return (
    <div className="retro-frame w-full">
      <span className="screw-tl" />
      <span className="screw-br" />
      <span className="retro-label">BOARD</span>
      <div ref={containerRef} className="retro-screen w-full overflow-x-auto">
        <div
          className="flex flex-col"
          style={{ gap: '3px', width: 'fit-content', margin: '0 auto' }}
        >
          {board.map((row) => (
            <div key={row[0].row} className="flex" style={{ gap: '3px' }}>
              {row.map((cell) => (
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
  );
}
