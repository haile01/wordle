import { Close } from '@mui/icons-material';
import { Grow, IconButton, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

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
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  content: {
    padding: 10,
    width: "100%",
    height: "90%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
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
  stats: {
    flexGrow: 1,
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
  },
}));

interface StatsPanelProps {
  show: boolean,
  handleClose: () => void,
}

const StatsPanel: React.FC<StatsPanelProps> = ({
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
                STATISTICS
              </Typography>
              <IconButton
                style={{ position: "absolute" }}
                className={styles.close}
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            </div>
            <div className={styles.stats}>
              <Typography variant="h6" color="text">
                Imma finish dis real quick ;)
              </Typography>
            </div>
          </div>
        </Paper>
      </Grow>
    </section>
  )
}

export default StatsPanel;