import { Collapse, IconButton, Paper, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Help, Leaderboard, Settings } from '@mui/icons-material';
import SettingsPanel from '../SettingsPanel';
import Words from './words';
import { checkInvalid, getEmptyKeyState, getWord, loadStats, saveStats, Stats, str2Char, validate } from '../../lib/helpers';
import Keyboard from './keyboard';
import { Character } from '../../lib/types';
import HelpPanel from '../HelpPanel';
import StatsPanel from '../StatsPanel';

const useStyles = makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100%",
    borderRadius: 0,
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 0px",
    borderBottom: "1px solid",
  },
  headerSide: {
    width: 150,
  },
  headerMiddle: {
    flexGrow: 1,
  },
  words: {

  },
  keyboard: {

  }
}))

interface GameProps {

}

const Game: React.FC<GameProps> = () => {

  const styles = useStyles();

  const rowCount = 6;

  const [keyword, setKeyword] = useState("force"); // TODO
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [letterCount, setLetterCount] = useState(5);
  const [words, setWords] = useState(new Array(rowCount).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [keyState, setKeyState] = useState(getEmptyKeyState);
  const [finished, setFinished] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [stats, setStats] = useState<Stats>(loadStats());
  const [openSettings, setOpenSettings] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openStats, setOpenStats] = useState(false);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const startNewGame = async (count: number) => {
    setFinished(false);
    setKeyState(getEmptyKeyState);
    setCurrentInput("");
    setWords(new Array(rowCount).fill(""));
    setCurrentRow(0);
    const keyword = await getWord(count);
    setTimeout(() => setKeyword(keyword), 500); // Meh
  }

  const updateKeyboard = (word: string, verdict: Array<number>) => {
    word.split('').forEach((c: string, ind) => {
      let key: Character = str2Char(c);
      keyState[key] = Math.max(keyState[key], verdict[ind]);
    });

    setKeyState(keyState);
  }

  const handleAddLetter = (letter: string) => {
    if (currentInput.length < letterCount && /[a-zA-Z]/i.test(letter)) {
      setCurrentInput(currentInput + letter);
    }
  }

  const handleRemoveLetter = () => {
    setCurrentInput(currentInput.slice(0, -1));
  }

  const handleSubmit = async () => {
    if (currentInput.length !== letterCount)
      return;

    if (await checkInvalid(currentInput)) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 2000);
      return;
    }

    const verdict = validate(currentInput, keyword);
    if (verdict.every(v => v === 3)) {

      console.log(currentRow);

      setFinished(true);
      setStats(stats => {
        stats.played++;
        stats.winCount++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        stats.distribution[currentRow]++;
        saveStats(stats);
        return stats;
      });
    }
    else {
      if (currentRow === rowCount - 1) {
        setFinished(true);
        setStats(stats => {
          stats.played++;
          stats.currentStreak = 0;
          saveStats(stats);
          return stats;
        });
      }
    }

    updateKeyboard(currentInput, verdict);
    setWords(words.map((row, i) => (i === currentRow) ? currentInput : row));
    setCurrentInput("");
    setCurrentRow(currentRow + 1);
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (currentRow === rowCount)
      return;

    if (e.key === "Backspace") {
      handleRemoveLetter();
    } else if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key.length === 1) {
      handleAddLetter(e.key);
    }
  }, [currentRow, letterCount, handleAddLetter, handleRemoveLetter, handleSubmit]);

  useEffect(() => {
    window.document.addEventListener("keydown", handleKeyDown);
    return () => window.document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setWords(new Array(rowCount).fill(""));
  }, [letterCount, rowCount]);

  return (
    <ThemeProvider theme={theme}>
      <SettingsPanel
        mode={mode}
        show={openSettings}
        handleClose={() => setOpenSettings(false)}
        handleModeChange={(mode: 'light' | 'dark') => setMode(mode)}
        letterCount={letterCount}
        setLetterCount={(count: number) => setLetterCount(count)}
        // rowCount={rowCount}
        // setRowCount={(count: number) => setRowCount(count)}
        startNewGame={startNewGame}
      />
      <HelpPanel
        show={openHelp}
        handleClose={() => setOpenHelp(false)}
      />
      <StatsPanel
        stats={stats}
        show={openStats}
        handleClose={() => setOpenStats(false)}
      />
      <Paper className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerSide}>
            <IconButton onClick={() => setOpenHelp(true)}>
              <Help fontSize="large" />
            </IconButton>
          </div>
            <Typography
            className={styles.headerMiddle}
            variant="h4"
            color="text"
            style={{ fontWeight: "bold" }}
          >
            WORDLE
          </Typography>
          <div className={styles.headerSide}>
            <IconButton onClick={() => setOpenStats(true)}>
              <Leaderboard fontSize="large" />
            </IconButton>
            <IconButton onClick={() => setOpenSettings(true)}>
              <Settings fontSize="large" />
            </IconButton>
          </div>
        </header>
        <section className={styles.words}>
          <Words
            letterCount={letterCount}
            rowCount={rowCount}
            words={words}
            currentRow={currentRow}
            currentInput={currentInput}
            keyword={keyword}
          />
        </section>
        <section>
          <Collapse
            in={rowCount === currentRow || finished}
            mountOnEnter
          >
            <Typography variant="h5" color="text">
              The answer is <b>{keyword.toUpperCase()}</b>
            </Typography>
            <Button
              onClick={() => startNewGame(letterCount)}
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
            >
              Start new game?              
            </Button>
          </Collapse>
          <Collapse
            in={isInvalid}
            mountOnEnter
          >
            <Typography variant="h5" color="text">
              This word doesn't belong to the wordlist
            </Typography>
          </Collapse>
        </section>
        <section className={styles.keyboard}>
          <Keyboard
            keyState={keyState}
            handleAddLetter={handleAddLetter}
            handleRemoveLetter={handleRemoveLetter}
            handleSubmit={handleSubmit}
          />
        </section>
      </Paper>
    </ThemeProvider>
  );
}

export default Game;