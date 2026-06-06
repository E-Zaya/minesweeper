export type CellState = 'hidden' | 'revealed' | 'flagged' | 'questioned';

export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  adjacentMines: number;
  state: CellState;
}

export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export interface DifficultyConfig {
  rows: number;
  cols: number;
  mines: number;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  beginner: { rows: 5, cols: 5, mines: 4 },
  intermediate: { rows: 6, cols: 6, mines: 7 },
  expert: { rows: 8, cols: 8, mines: 13 },
};

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export interface GameState {
  board: Cell[][];
  status: GameStatus;
  minesLeft: number;
  startTime: number | null;
  elapsedTime: number;
  firstClick: boolean;
  difficulty: Difficulty;
}

export interface ScoreEntry {
  name: string;
  time: number;
  date: string;
  difficulty: Difficulty;
}

export type Language = 'en' | 'jp';
export type Theme = 'light' | 'dark';

export interface AppSettings {
  playerName: string;
  language: Language;
  theme: Theme;
}
