'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Cell, GameState, Difficulty, CellState } from '@/lib/minesweeper/types';
import { DIFFICULTY_CONFIG } from '@/lib/minesweeper/types';

function createEmptyBoard(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isMine: false,
      adjacentMines: 0,
      state: 'hidden' as CellState,
    }))
  );
}

function placeMines(board: Cell[][], mines: number, safeRow: number, safeCol: number): Cell[][] {
  const rows = board.length;
  const cols = board[0].length;
  const clone = board.map((row) => row.map((cell) => ({ ...cell })));

  // 3×3 safe zone around first click
  const safeSet = new Set<string>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = safeRow + dr;
      const nc = safeCol + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        safeSet.add(`${nr},${nc}`);
      }
    }
  }

  let placed = 0;
  const candidates: [number, number][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (!safeSet.has(`${r},${c}`)) candidates.push([r, c]);

  // Fisher-Yates partial shuffle
  for (let i = candidates.length - 1; i > 0 && placed < mines; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    const [r, c] = candidates[i];
    clone[r][c].isMine = true;
    placed++;
  }

  // Calculate adjacent mine counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (clone[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && clone[nr][nc].isMine) count++;
        }
      clone[r][c].adjacentMines = count;
    }
  }

  return clone;
}

function bfsReveal(board: Cell[][], startRow: number, startCol: number): Cell[][] {
  const rows = board.length;
  const cols = board[0].length;
  const clone = board.map((row) => row.map((cell) => ({ ...cell })));
  const queue: [number, number][] = [[startRow, startCol]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const cell = clone[r][c];
    if (cell.state === 'flagged' || cell.state === 'questioned') continue;
    cell.state = 'revealed';

    if (cell.adjacentMines === 0 && !cell.isMine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
            !visited.has(`${nr},${nc}`) &&
            clone[nr][nc].state === 'hidden'
          ) {
            queue.push([nr, nc]);
          }
        }
    }
  }

  return clone;
}

function checkWin(board: Cell[][]): boolean {
  for (const row of board)
    for (const cell of row)
      if (!cell.isMine && cell.state !== 'revealed') return false;
  return true;
}

function countFlags(board: Cell[][]): number {
  let count = 0;
  for (const row of board)
    for (const cell of row)
      if (cell.state === 'flagged') count++;
  return count;
}

function makeInitialState(difficulty: Difficulty): GameState {
  const { rows, cols, mines } = DIFFICULTY_CONFIG[difficulty];
  return {
    board: createEmptyBoard(rows, cols),
    status: 'idle',
    minesLeft: mines,
    startTime: null,
    elapsedTime: 0,
    firstClick: true,
    difficulty,
  };
}

export function useMinesweeper(difficulty: Difficulty) {
  const [state, setState] = useState<GameState>(() => makeInitialState(difficulty));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        elapsedTime: prev.startTime ? Math.floor((Date.now() - prev.startTime) / 1000) : 0,
      }));
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const reset = useCallback((newDifficulty?: Difficulty) => {
    stopTimer();
    setState(makeInitialState(newDifficulty ?? difficulty));
  }, [difficulty, stopTimer]);

  const reveal = useCallback((row: number, col: number) => {
    setState((prev) => {
      if (prev.status === 'won' || prev.status === 'lost') return prev;
      const cell = prev.board[row][col];
      if (cell.state === 'revealed' || cell.state === 'flagged') return prev;

      let board = prev.board;
      let firstClick = prev.firstClick;
      let startTime = prev.startTime;
      let status = prev.status;

      if (firstClick) {
        board = placeMines(board, DIFFICULTY_CONFIG[prev.difficulty].mines, row, col);
        startTime = Date.now();
        firstClick = false;
        status = 'playing';
        // start timer after state update via effect, handled below
      }

      if (board[row][col].state === 'questioned') {
        // treat questioned as revealable
        const clone = board.map((r) => r.map((c) => ({ ...c })));
        clone[row][col].state = 'hidden';
        board = clone;
      }

      if (board[row][col].isMine) {
        // Reveal all mines
        const clone = board.map((r) =>
          r.map((c) => ({ ...c, state: c.isMine ? ('revealed' as CellState) : c.state }))
        );
        return { ...prev, board: clone, status: 'lost', startTime, firstClick, elapsedTime: startTime ? Math.floor((Date.now() - startTime) / 1000) : prev.elapsedTime };
      }

      const newBoard = bfsReveal(board, row, col);
      const won = checkWin(newBoard);
      const newStatus: GameState['status'] = won ? 'won' : status === 'idle' ? 'playing' : status;
      const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : prev.elapsedTime;

      return {
        ...prev,
        board: newBoard,
        status: newStatus,
        startTime,
        firstClick,
        elapsedTime: won ? elapsed : prev.elapsedTime,
        minesLeft: DIFFICULTY_CONFIG[prev.difficulty].mines - countFlags(newBoard),
      };
    });
  }, []);

  // Effect to start/stop timer based on status
  useEffect(() => {
    if (state.status === 'playing' && state.startTime) {
      startTimer();
    } else if (state.status === 'won' || state.status === 'lost') {
      stopTimer();
    }
  }, [state.status, state.startTime, startTimer, stopTimer]);

  const toggleFlag = useCallback((row: number, col: number) => {
    setState((prev) => {
      if (prev.status === 'won' || prev.status === 'lost') return prev;
      const cell = prev.board[row][col];
      if (cell.state === 'revealed') return prev;

      const clone = prev.board.map((r) => r.map((c) => ({ ...c })));
      const next: Record<CellState, CellState> = {
        hidden: 'flagged',
        flagged: 'questioned',
        questioned: 'hidden',
        revealed: 'revealed',
      };
      clone[row][col].state = next[cell.state];
      const minesLeft = DIFFICULTY_CONFIG[prev.difficulty].mines - countFlags(clone);
      return { ...prev, board: clone, minesLeft };
    });
  }, []);

  // Chord: reveal all unflagged neighbors of a revealed numbered cell
  const chord = useCallback((row: number, col: number) => {
    setState((prev) => {
      if (prev.status === 'won' || prev.status === 'lost') return prev;
      const cell = prev.board[row][col];
      if (cell.state !== 'revealed' || cell.adjacentMines === 0) return prev;

      const rows = prev.board.length;
      const cols = prev.board[0].length;
      const neighbors: [number, number][] = [];
      let flagCount = 0;

      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = row + dr;
          const nc = col + dc;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          const n = prev.board[nr][nc];
          if (n.state === 'flagged') flagCount++;
          else if (n.state === 'hidden' || n.state === 'questioned') neighbors.push([nr, nc]);
        }

      if (flagCount !== cell.adjacentMines) return prev;

      // Reveal each neighbor — check for mine hit
      let board = prev.board;
      let hitMine = false;
      for (const [nr, nc] of neighbors) {
        if (board[nr][nc].isMine) {
          hitMine = true;
          break;
        }
        board = bfsReveal(board, nr, nc);
      }

      if (hitMine) {
        const clone = board.map((r) =>
          r.map((c) => ({ ...c, state: c.isMine ? ('revealed' as CellState) : c.state }))
        );
        return { ...prev, board: clone, status: 'lost' };
      }

      const won = checkWin(board);
      const elapsed = prev.startTime ? Math.floor((Date.now() - prev.startTime) / 1000) : prev.elapsedTime;
      return {
        ...prev,
        board,
        status: won ? 'won' : prev.status,
        elapsedTime: won ? elapsed : prev.elapsedTime,
        minesLeft: DIFFICULTY_CONFIG[prev.difficulty].mines - countFlags(board),
      };
    });
  }, []);

  return { state, reveal, toggleFlag, chord, reset };
}
