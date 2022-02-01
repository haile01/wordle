import { Close } from '@mui/icons-material';
import { Grow, IconButton, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Stats } from '../../lib/helpers';

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
  numbers: {
    display: "flex",
    flexFlow: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "baseline",
    columnGap: 40,
    marginBottom: 50,
  },
  number: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    width: 70,

    "& > p": {
      whiteSpace: "wrap",
    }
  },
  dist: {
    width: "100%",
  },
  distContent: {
    padding: 10,
    display: "grid",
    gridTemplateColumns: "10px 1fr 10px",
    columnGap: 10,
  },
  distAxis: {

  },
  distBar: {
    width: "100%",
  },
  distCount: {
    minWidth: 10,
    padding: "0px 5px",
    color: "white",
    textAlign: "right",
  },
}));

interface StatsPanelProps {
  stats: Stats,
  show: boolean,
  handleClose: () => void,
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  stats,
  show,
  handleClose,
}) => {
  const styles = useStyles();

  const maxDist = Math.max(...stats.distribution);

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
              <div className={styles.numbers}>
                <div className={styles.number}>
                  <Typography variant="h3" color="text">
                    {stats.played}
                  </Typography>
                  <Typography variant="body1" color="text">
                    Played
                  </Typography>
                </div>
                <div className={styles.number}>
                  <Typography variant="h3" color="text">
                    {Math.round(stats.winCount / stats.played * 100)}%
                  </Typography>
                  <Typography variant="body1" color="text">
                    Win %
                  </Typography>
                </div>
                <div className={styles.number}>
                  <Typography variant="h3" color="text">
                    {stats.currentStreak}
                  </Typography>
                  <Typography variant="body1" color="text">
                    Current streak
                  </Typography>
                </div>
                <div className={styles.number}>
                  <Typography variant="h3" color="text">
                    {stats.maxStreak}
                  </Typography>
                  <Typography variant="body1" color="text">
                    Max streak
                  </Typography>
                </div>
              </div>
              <div className={styles.dist}>
                <Typography variant="body1" color="text">
                  <b>GUESS DISTRIBUTION</b>
                </Typography>
                {
                  stats.distribution.map((count, i) => (
                    <div key={i} className={styles.distContent}>
                      <div className={styles.distAxis}>
                        <Typography variant="body1" color="text">
                          {i + 1}
                        </Typography>
                      </div>
                      <div className={styles.distBar}>
                        <Typography
                          style={{ 
                            width: `${count / maxDist * 100}%`,
                            backgroundColor: count > 0 ? "#6aaa64" : "#787c7e",
                          }}
                          className={styles.distCount}
                          variant="body1"
                          color="text"
                          component="div"
                        >
                          <b>{count}</b>
                        </Typography>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </Paper>
      </Grow>
    </section>
  )
}

export default StatsPanel;