'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Difficulty, Language, Theme } from '@/lib/minesweeper/types';
import { t } from '@/lib/minesweeper/i18n';
import { useMinesweeper } from '@/hooks/useMinesweeper';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useSound } from '@/hooks/useSound';
import NameEntry from '@/components/minesweeper/NameEntry';
import DifficultySelect from '@/components/minesweeper/DifficultySelect';
import Board from '@/components/minesweeper/Board';
import Header from '@/components/minesweeper/Header';
import GameOverlay from '@/components/minesweeper/GameOverlay';
import Leaderboard from '@/components/minesweeper/Leaderboard';
import HowToPlay from '@/components/minesweeper/HowToPlay';

type Screen = 'name' | 'difficulty' | 'game';

export default function MinesweeperPage() {
  const [screen, setScreen] = useState<Screen>('name');
  const [playerName, setPlayerName] = useState('Player');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showGameOverlay, setShowGameOverlay] = useState(false);
  const [savedForRound, setSavedForRound] = useState(false);
  const [flagMode, setFlagMode] = useState(false);

  const { state, reveal, toggleFlag, chord, reset } = useMinesweeper(difficulty);
  const { addScore, getByDifficulty } = useLeaderboard();
  const { play } = useSound();

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
  }, [theme]);

  const handleStart = useCallback((name: string, lang: Language, th: Theme) => {
    setPlayerName(name);
    setLanguage(lang);
    setTheme(th);
    setScreen('difficulty');
  }, []);

  const handleDifficulty = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    reset(diff);
    setShowGameOverlay(false);
    setSavedForRound(false);
    setFlagMode(false);
    setScreen('game');
  }, [reset]);

  const handleReveal = useCallback((r: number, c: number) => {
    const cell = state.board[r]?.[c];
    if (!cell || cell.state === 'flagged') return;
    play(cell.isMine && !state.firstClick ? 'lose' : 'reveal');
    reveal(r, c);
  }, [reveal, play, state.board, state.firstClick]);

  const handleFlag = useCallback((r: number, c: number) => {
    play('flag');
    toggleFlag(r, c);
  }, [toggleFlag, play]);

  const handleChord = useCallback((r: number, c: number) => {
    play('chord');
    chord(r, c);
  }, [chord, play]);

  const handleReset = useCallback(() => {
    reset(difficulty);
    setShowGameOverlay(false);
    setSavedForRound(false);
    setFlagMode(false);
  }, [reset, difficulty]);

  const handleRetry = useCallback(() => {
    reset(difficulty);
    setShowGameOverlay(false);
    setSavedForRound(false);
    setFlagMode(false);
  }, [reset, difficulty]);

  const handleSaveScore = useCallback((name: string) => {
    if (savedForRound) return;
    const date = new Date().toLocaleDateString('sv');
    addScore({ name, time: state.elapsedTime, date, difficulty });
    setSavedForRound(true);
  }, [addScore, difficulty, state.elapsedTime, savedForRound]);

  const handleBackToDifficulty = useCallback(() => {
    setScreen('difficulty');
    reset(difficulty);
    setShowGameOverlay(false);
    setSavedForRound(false);
    setFlagMode(false);
  }, [reset, difficulty]);

  const handleBackToName = useCallback(() => setScreen('name'), []);

  useEffect(() => {
    if (state.status === 'won')  { play('win');  setShowGameOverlay(true); }
    if (state.status === 'lost') { play('lose'); setShowGameOverlay(true); }
  }, [state.status, play]);

  const gameOver = state.status === 'won' || state.status === 'lost';

  /* ── Name entry ── */
  if (screen === 'name') return <NameEntry onStart={handleStart} />;

  /* ── Difficulty select ── */
  if (screen === 'difficulty') {
    return (
      <>
        <DifficultySelect
          language={language}
          onSelect={handleDifficulty}
          onLeaderboard={() => setShowLeaderboard(true)}
          onBack={handleBackToName}
        />
        {showLeaderboard && (
          <Leaderboard language={language} getByDifficulty={getByDifficulty}
            onClose={() => setShowLeaderboard(false)} />
        )}
      </>
    );
  }

  /* ── Game screen ── */
  return (
    // h-screen + overflow-hidden = hard viewport ceiling so board can size itself to fit
    <div className="h-screen overflow-hidden flex flex-col md:flex-row">

      {/* Header renders mobile <header> (top bar) + desktop <aside> (sidebar) */}
      <Header
        minesLeft={state.minesLeft}
        elapsedTime={state.elapsedTime}
        language={language}
        difficulty={difficulty}
        playerName={playerName}
        flagMode={flagMode}
        gameOver={gameOver}
        onReset={handleReset}
        onLeaderboard={() => setShowLeaderboard(true)}
        onHowToPlay={() => setShowHowToPlay(true)}
        onBack={handleBackToDifficulty}
        onFlagModeToggle={() => setFlagMode(f => !f)}
      />

      {/* Main area — flex-1 means it fills all space the sidebar doesn't take */}
      <main className="flex-1 flex items-center justify-center min-w-0 overflow-hidden
                       p-2 pb-20 md:p-4 md:pb-4">
        <Board
          board={state.board}
          difficulty={difficulty}
          gameOver={gameOver}
          flagMode={flagMode}
          onReveal={handleReveal}
          onFlag={handleFlag}
          onChord={handleChord}
        />
      </main>

      {/* Game over overlay */}
      {gameOver && showGameOverlay && (state.status === 'won' || state.status === 'lost') && (
        <GameOverlay
          status={state.status}
          time={state.elapsedTime}
          playerName={playerName}
          language={language}
          difficulty={difficulty}
          onRetry={handleRetry}
          onSave={handleSaveScore}
          onReviewBoard={() => setShowGameOverlay(false)}
          onBackToDifficulty={handleBackToDifficulty}
        />
      )}

      {/* "Show result" pill when overlay is dismissed */}
      {gameOver && !showGameOverlay && (
        <button
          onClick={() => setShowGameOverlay(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 neu-btn-primary
                     px-5 py-2.5 rounded-2xl font-serif text-sm tracking-wider
                     transition-all duration-200 active:scale-95 animate-bounce-subtle"
        >
          ↑ {t(language, 'showResult')}
        </button>
      )}

      {showLeaderboard && (
        <Leaderboard language={language} getByDifficulty={getByDifficulty}
          onClose={() => setShowLeaderboard(false)} />
      )}

      {showHowToPlay && (
        <HowToPlay language={language} onClose={() => setShowHowToPlay(false)} />
      )}
    </div>
  );
}
