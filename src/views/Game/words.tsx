import { makeStyles } from '@mui/styles';
import React from 'react';
import { EmptyTile, InputTile, Tile } from './tiles';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface WordsProps {
  letterCount: number,
  rowCount: number,
  words: string[],
  currentRow: number,
  currentInput: string,
  keyword: string,
}

const Words: React.FC<WordsProps> = ({
  letterCount,
  rowCount, 
  words, 
  currentRow,
  currentInput,
  keyword,
}) => {

  const styles = useStyles();

  return (
    <section className={styles.container}>
      {
        words.map((row, index) => (
          <div key={index} className={styles.row}>
            {
              index < currentRow ? (
                row.split("").map((letter, i) => (
                  <Tile
                    key={i}
                    letter={letter}
                    position={i}
                    word={keyword}
                  />
                ))
              ) : 
              index === currentRow ? (
                <>
                  {
                    currentInput.split("").map((letter, i) => (
                      <InputTile
                        key={i}
                        letter={letter}
                      />
                    ))
                  }
                  {
                    new Array(letterCount - currentInput.length).fill("").map((_, i) => (
                      <EmptyTile
                        key={i}
                      />
                    ))
                  }
                </>
              ) : (
                new Array(letterCount).fill("").map((_, i) => (
                  <EmptyTile
                    key={i}
                  />
                ))
              )
            }
          </div>
        ))
      }
    </section>
  )
}

export default Words;