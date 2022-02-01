import { Backspace } from '@mui/icons-material';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { str2Char } from '../../lib/helpers';
import { KeyState } from '../../lib/types';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexFlow: "column",
    rowGap: 5,
    paddingBottom: 50,
  },
  row: {
    display: 'flex',
    flexFlow: 'row',
    columnGap: 5,
    justifyContent: "center",
  },
  key: {
    height: 58,
  },
}));

interface KeyboardProps {
  keyState: KeyState,
  handleAddLetter: (letter: string) => void,
  handleRemoveLetter: () => void,
  handleSubmit: () => Promise<void>,
}

const Keyboard: React.FC<KeyboardProps> = ({
  keyState,
  handleAddLetter,
  handleRemoveLetter,
  handleSubmit
}) => {

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {'qwertyuiop'.split('').map((letter, i) => (
          <Key
            key={i}
            letter={letter}
            state={keyState[str2Char(letter)] || 0}
            onClick={() => handleAddLetter(letter)}
          />
        ))}
      </div>
      <div className={styles.row}>
        {'asdfghjkl'.split('').map((letter, i) => (
            <Key
              key={i}
              letter={letter}
              state={keyState[str2Char(letter)] || 0}
              onClick={() => handleAddLetter(letter)}
            />
          ))}
      </div>
      <div className={styles.row}>
        <Key
          letter={"enter"}
          state={0}
          onClick={handleSubmit}
        />
        {'zxcvbnm'.split('').map((letter, i) => (
          <Key
            key={i}
            letter={letter}
            state={keyState[str2Char(letter)] || 0}
            onClick={() => handleAddLetter(letter)}
          />
        ))}
        <Key
          icon={<Backspace />}
          letter={""}
          state={0}
          onClick={handleRemoveLetter}
        />
      </div>
    </div>
  )
}

interface KeyProps {
  state: number,
  letter: string,
  icon?: React.ReactNode,
  onClick: () => void,
}

const Key: React.FC<KeyProps> = ({
  state,
  letter,
  icon,
  onClick,
}) => {
  const styles = useStyles();

  const backgroundColors = ["#d3d6da", "#787c7e", "#c9b458", "#6aaa64"];

  return (
    <Button
      style={{
        color: state === 0 ? "black" : "white",
        backgroundColor: backgroundColors[state],
        minWidth: 43,
        borderRadius: 5,
        fontWeight: "bold",
        fontSize: 15,
      }}
      className={styles.key}
      onClick={onClick}
    >
      {icon ? icon : letter.toUpperCase()}
    </Button>
  )
}

export default Keyboard;