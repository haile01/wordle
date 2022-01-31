import { Close } from '@mui/icons-material';
import { Grow, IconButton, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { CorrectTile, InputTile, PartialTile, WrongTile } from '../Game/tiles';

const useStyles = makeStyles(theme => ({
  placeholder: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 600,
    height: "100%",
    zIndex: 1,
  },
  container: {
    width: "100%",
    maxWidth: "100vw",
    height: "100%",
  },
  content: {
    padding: 10,
  },
  header: {
    width: "100%",
    position: "relative",
    padding: "10px 0px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  close: {
    top: 0,
    right: 0,
    height: "100%",
  },
  help: {
    marginTop: 30,

    "& > p": {
      textAlign: "left",
    }
  },
  separator: {
    width: "100%",
    height: 0,
    margin: "10px 0px",
    borderBottom: "1px solid",
  },
  example: {
    padding: 10,

    "& > p": {
      textAlign: "left",
      paddingLeft: 5,
    }
  },
  word: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    marginBottom: 5,
  }
}));

interface HelpPanelProps {
  show: boolean,
  handleClose: () => void,
}

const HelpPanel: React.FC<HelpPanelProps> = ({
  show,
  handleClose,
}) => {
  const styles = useStyles();

  return (
    <section style={{ display: show ? "initial" : "none" }} className={styles.placeholder}>
      <Grow in={show} mountOnEnter>
        <Paper className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <Typography style={{ fontWeight: "bold" }} variant="h5" color="text">
                HOW TO PLAY
              </Typography>
              <IconButton
                style={{ position: "absolute" }}
                className={styles.close}
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            </div>
            <div className={styles.help}>
              <Typography variant="body1" color="text">
                Guess the <b>WORDLE</b> in 6 tries.
              </Typography>
              <br></br>
              <Typography variant="body1" color="text">
                Each guess must be a valid 5 letter word. Hit the enter button to submit.
              </Typography>
              <br></br>
              <Typography variant="body1" color="text">
                After each guess, the color of the tiles will change to show how close your guess was to the word.
              </Typography>
              <div className={styles.separator} />
              <Typography variant="body1" color="text">
                <b>Examples</b>
              </Typography>
              <div className={styles.example}>
                <div className={styles.word}>
                  <CorrectTile letter="w" />
                  <InputTile letter="e" />
                  <InputTile letter="a" />
                  <InputTile letter="r" />
                  <InputTile letter="y" />
                </div>
                <Typography variant="body1" color="text">
                  The letter <b>W</b> is in the word and in the correct spot.
                </Typography>
              </div>
              <div className={styles.example}>
                <div className={styles.word}>
                  <InputTile letter="p" />
                  <PartialTile letter="i" />
                  <InputTile letter="l" />
                  <InputTile letter="l" />
                  <InputTile letter="s" />
                </div>
                <Typography variant="body1" color="text">
                  The letter <b>I</b> is in the word but in the wrong spot.
                </Typography>
              </div>
              <div className={styles.example}>
                <div className={styles.word}>
                  <InputTile letter="v" />
                  <InputTile letter="a" />
                  <WrongTile letter="g" />
                  <InputTile letter="u" />
                  <InputTile letter="e" />
                </div>
                <Typography variant="body1" color="text">
                  The letter <b>G</b> is not in the word.
                </Typography>
              </div>
              <div className={styles.separator} />
              <Typography variant="body1" color="text">
                <b>Note: currently all the keywords doesn't have multiple duplicating letters</b>
              </Typography>
            </div>
          </div>
        </Paper>
      </Grow>
    </section>
  )
}

export default HelpPanel;