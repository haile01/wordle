import { makeStyles } from '@mui/styles';
import React from 'react';

const useTileComponentStyles = makeStyles(theme => ({
  container: {
    width: 62,
    height: 62,
    border: "1px solid",
    margin: 5,
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: "60px",
  }
}));

interface TileComponentProps {
  letter?: string,
  borderColor: string,
  backgroundColor: string,
  color: string,
}

const TileComponent: React.FC<TileComponentProps> = ({
  letter,
  borderColor,
  backgroundColor,
  color,
}) => {

  const styles = useTileComponentStyles();

  return (
    <div
      className={styles.container}
      style={{
        borderColor,
        backgroundColor,
        color,
      }}
    >
      {letter?.toUpperCase()}
    </div>
  );
}

const useTileStyles = makeStyles(theme => ({
  "@keyframes pop": {
    "0%": {
      transform: "scale(0.8)",
      opacity: 0,
    },
    "40%": {
      transform: "scale(1.1)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  "@keyframes flipIn": {
    "0%": {
      transform: "rotateX(-90deg)",
    },
    "100%": {
      transform: "rotateX(0deg)",
    },
  },
  "@keyframes flipOut": {
    "0%": {
      transform: "rotateX(0deg)",
    },
    "100%": {
      transform: "rotateX(-90deg)",
    },
  },
  input: {
    animation: "$pop 0.1s ease-in-out",
    animationFillMode: "forwards",
  },
  wrong: {
    animation: "$flipIn 0.3s ease-in-out",
    animationFillMode: "forwards",
  },
  partial: {
    animation: "$flipIn 0.3s ease-in-out",
    animationFillMode: "forwards",
  },
  correct: {
    animation: "$flipIn 0.3s ease-in-out",
    animationFillMode: "forwards",
  },
}));

interface TileProps {
  letter: string,
  state: number,
}

export const Tile: React.FC<TileProps> = ({
  letter,
  state,
}) => {
  if (state === 1)
    return <WrongTile letter={letter} />;
  else if (state === 2)
    return <PartialTile letter={letter} />;
  else if (state === 3)
    return <CorrectTile letter={letter} />;
  else
    return <></>
}

interface StyledTileProps {
  letter?: string,
  delay?: number,
}

export const EmptyTile: React.FC<StyledTileProps> = () => {

  return (
    <div>
      <TileComponent
        borderColor="#d3d6da"
        backgroundColor="white"
        color="white"
      />
    </div>
  )
}

export const InputTile: React.FC<StyledTileProps> = ({
  letter,
}) => {

  const styles = useTileStyles();

  return (
    <div className={styles.input}>
      <TileComponent
        letter={letter}
        borderColor="#1a1a1b"
        backgroundColor="white"
        color="#1a1a1b"
      />
    </div>
  )
}

export const WrongTile: React.FC<StyledTileProps> = ({
  letter,
  delay = 0,
}) => {

  const styles = useTileStyles();

  return (
    <div style={{ animationDelay: `${delay}ms` }} className={styles.wrong}>
      <TileComponent
        letter={letter}
        borderColor="#787c7e"
        backgroundColor="#787c7e"
        color="white"
      />
    </div>
  )
}

export const PartialTile: React.FC<StyledTileProps> = ({
  letter,
  delay = 0,
}) => {

  const styles = useTileStyles();

  return (
    <div style={{ animationDelay: `${delay}ms` }} className={styles.partial}>
      <TileComponent
        letter={letter}
        borderColor="#c9b458"
        backgroundColor="#c9b458"
        color="white"
      />
    </div>
  )
}

export const CorrectTile: React.FC<StyledTileProps> = ({
  letter,
  delay = 0,
}) => {

  const styles = useTileStyles();

  return (
    <div style={{ animationDelay: `${delay}ms` }} className={styles.correct}>
      <TileComponent
        letter={letter}
        borderColor="#6aaa64"
        backgroundColor="#6aaa64"
        color="white"
      />
    </div>
  )
}