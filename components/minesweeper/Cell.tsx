'use client';

import { useRef, useCallback } from 'react';
import type { Cell as CellType } from '@/lib/minesweeper/types';

interface Props {
  cell: CellType;
  cellSize: number;
  flagMode: boolean;
  onReveal: (r: number, c: number) => void;
  onFlag: (r: number, c: number) => void;
  onChord: (r: number, c: number) => void;
  gameOver: boolean;
}

const NUMBER_COLORS: Record<number, string> = {
  1: 'text-blue-700 dark:text-blue-300',
  2: 'text-emerald-700 dark:text-emerald-300',
  3: 'text-red-700 dark:text-red-300',
  4: 'text-purple-700 dark:text-purple-300',
  5: 'text-amber-800 dark:text-amber-300',
  6: 'text-teal-700 dark:text-teal-300',
  7: 'text-stone-900 dark:text-stone-100',
  8: 'text-stone-700 dark:text-stone-300',
};

export default function Cell({ cell, cellSize, flagMode, onReveal, onFlag, onChord, gameOver }: Props) {
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchMovedRef = useRef(false);
  const lastTapRef = useRef<number>(0);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!gameOver) onFlag(cell.row, cell.col);
    },
    [cell.row, cell.col, onFlag, gameOver]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      if (cell.state === 'revealed') {
        onChord(cell.row, cell.col);
        return;
      }
      if (gameOver) return;
      if (flagMode) onFlag(cell.row, cell.col);
      else onReveal(cell.row, cell.col);
    },
    [cell.row, cell.col, cell.state, onReveal, onFlag, onChord, gameOver, flagMode]
  );

  // Touch: long press = flag, double-tap = chord
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchMovedRef.current = false;
      const now = Date.now();
      const timeSinceLast = now - lastTapRef.current;

      if (cell.state === 'revealed' && timeSinceLast < 350) {
        // double tap on revealed = chord
        e.preventDefault();
        onChord(cell.row, cell.col);
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;

      if (cell.state !== 'revealed') {
        longPressRef.current = setTimeout(() => {
          if (!touchMovedRef.current && !gameOver) {
            e.preventDefault();
            onFlag(cell.row, cell.col);
          }
        }, 500);
      }
    },
    [cell.row, cell.col, cell.state, onFlag, onChord, gameOver]
  );

  const handleTouchMove = useCallback(() => {
    touchMovedRef.current = true;
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (longPressRef.current) {
        clearTimeout(longPressRef.current);
        longPressRef.current = null;
        if (!touchMovedRef.current && cell.state !== 'revealed' && !gameOver) {
          e.preventDefault();
          if (flagMode) onFlag(cell.row, cell.col);
          else onReveal(cell.row, cell.col);
        }
      }
    },
    [cell.row, cell.col, cell.state, onReveal, onFlag, gameOver, flagMode]
  );

  const size = `${cellSize}px`;

  if (cell.state === 'revealed') {
    if (cell.isMine) {
      return (
        <div
          style={{ width: size, height: size, minWidth: size, minHeight: size }}
          className="neu-cell-mine flex items-center justify-center rounded-md select-none text-lg"
          onClick={handleClick}
        >
          💣
        </div>
      );
    }
    return (
      <div
        style={{ width: size, height: size, minWidth: size, minHeight: size, fontSize: `${Math.max(12, cellSize * 0.48)}px` }}
        className={`neu-cell-revealed flex items-center justify-center rounded-md select-none font-mono font-bold
          ${cell.adjacentMines > 0 ? NUMBER_COLORS[cell.adjacentMines] : ''}`}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cell.adjacentMines > 0 ? cell.adjacentMines : ''}
      </div>
    );
  }

  if (cell.state === 'flagged') {
    return (
      <div
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        className="neu-cell-raised flex items-center justify-center rounded-md select-none cursor-pointer
                   transition-all duration-150 active:scale-95 text-lg"
        onClick={handleContextMenu}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        🚩
      </div>
    );
  }

  if (cell.state === 'questioned') {
    return (
      <div
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        className="neu-cell-raised flex items-center justify-center rounded-md select-none cursor-pointer
                   transition-all duration-150 active:scale-95 text-lg"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <span className="text-amber-500 dark:text-amber-400 font-bold font-mono" style={{ fontSize: `${Math.max(11, cellSize * 0.44)}px` }}>？</span>
      </div>
    );
  }

  // hidden
  return (
    <div
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className="neu-cell-raised flex items-center justify-center rounded-md select-none cursor-pointer
                 transition-all duration-100 active:scale-95 hover:brightness-105"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
}
