import { IconButton, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useMemo, useState } from 'react';
import { Help, Leaderboard, Settings } from '@mui/icons-material';
import SettingsPanel from '../SettingsPanel';
import Words from './words';
import { getEmptyKeyState, str2Char, validate } from '../../lib/helpers';
import Keyboard from './keyboard';
import { Character } from '../../lib/types';

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

  const letterCount = 5; //TODO: make dis a state
  const rowCount = 6; //TODO: make dis a state

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [openSettings, setOpenSettings] = useState(false);
  const [words, setWords] = useState(new Array(rowCount).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [keyword, setKeyword] = useState("force"); // TODO
  const [keyState, setKeyState] = useState(getEmptyKeyState);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const updateKeyboard = () => {
    currentInput.split('').forEach((c, ind) => {
      let key: Character = str2Char(c);
      keyState[key] = Math.max(keyState[key], validate(key, ind, keyword));
    })

    setKeyState(keyState);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentRow === rowCount)
        return;

      if (e.key === "Backspace") {
        setCurrentInput(currentInput.slice(0, -1));
      } else if (e.key === "Enter") {
        if (currentInput.length !== letterCount)
          return;

        updateKeyboard();
        setWords(words.map((row, i) => (i === currentRow) ? currentInput : row));
        setCurrentInput("");
        setCurrentRow(currentRow + 1);
      } else if (e.key.length === 1 && currentInput.length < letterCount && /[a-zA-Z]/i.test(e.key)) {
        console.log("prev", currentInput);
        setCurrentInput(currentInput + e.key);
      }
    }

    window.document.addEventListener("keydown", handleKeyDown);
    return () => window.document.removeEventListener("keydown", handleKeyDown);
  }, [currentInput]);

  useEffect(() => console.log(currentInput), [currentInput]);
  useEffect(() => console.log(words), [words]);

  return (
    <ThemeProvider theme={theme}>
      <SettingsPanel
        mode={mode}
        show={openSettings}
        handleClose={() => setOpenSettings(false)}
        handleModeChange={(mode: 'light' | 'dark') => setMode(mode)}
      />
      <Paper className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerSide}>
            <IconButton>
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
            <IconButton>
              <Leaderboard fontSize="large" />
            </IconButton>
            <IconButton>
              <Settings fontSize="large" onClick={() => setOpenSettings(true)} />
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
        <section className={styles.keyboard}>
          <Keyboard keyState={keyState} />
        </section>
      </Paper>
    </ThemeProvider>
  );
}

export default Game;