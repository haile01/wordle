import { Collapse, IconButton, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useMemo, useState } from 'react';
import { Help, Leaderboard, Settings } from '@mui/icons-material';
import SettingsPanel from '../SettingsPanel';
import Words from './words';
import { checkInvalid, getEmptyKeyState, getWord, str2Char, validate } from '../../lib/helpers';
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

  const [keyword, setKeyword] = useState("force"); // TODO
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [openSettings, setOpenSettings] = useState(false);
  const [letterCount, setLetterCount] = useState(5);
  const [rowCount, setRowCount] = useState(6); // Currently still hardcoded
  const [words, setWords] = useState(new Array(rowCount).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [keyState, setKeyState] = useState(getEmptyKeyState);
  const [finished, setFinished] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const startNewGame = async (count: number) => {
    setFinished(false);
    setKeyState(getEmptyKeyState);
    setCurrentInput("");
    setWords(new Array(rowCount).fill(""));
    setCurrentRow(0);
    setKeyword(await getWord(count));
  }

  const updateKeyboard = () => {
    let check = true;
    currentInput.split('').forEach((c, ind) => {
      let key: Character = str2Char(c);
      keyState[key] = Math.max(keyState[key], validate(key, ind, keyword));
      check = check && (keyState[key] === 3);
    })

    if (check) {
      setFinished(true);
    }
    setKeyState(keyState);
  }

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (currentRow === rowCount)
        return;

      if (e.key === "Backspace") {
        setCurrentInput(currentInput.slice(0, -1));
      } else if (e.key === "Enter") {
        if (currentInput.length !== letterCount)
          return;

        if (await checkInvalid(currentInput)) {
          setIsInvalid(true);
          setTimeout(() => setIsInvalid(false), 2000);
          return;
        }

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

  useEffect(() => {
    setWords(new Array(rowCount).fill(""));
  }, [letterCount, rowCount]);

  useEffect(() => console.log(currentInput), [currentInput]);
  useEffect(() => console.log(words), [words]);

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
        <section>
          <Collapse
            in={rowCount === currentRow || finished}
            mountOnEnter
          >
            <Typography variant="h5" color="initial">
              The answer is <b>{keyword.toUpperCase()}</b>
            </Typography>
          </Collapse>
        </section>
        <section>
          <Collapse
            in={isInvalid}
            mountOnEnter
          >
            <Typography variant="h5" color="initial">
              This word doesn't belong to the wordlist
            </Typography>
          </Collapse>
        </section>
        <section className={styles.keyboard}>
          <Keyboard keyState={keyState} />
        </section>
      </Paper>
    </ThemeProvider>
  );
}

export default Game;