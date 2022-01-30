import { Close } from '@mui/icons-material';
import { Grow, IconButton, Paper, Switch, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    width: 600,
    maxWidth: "100vw",
    height: "100%",
    margin: "auto",
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
  settings: {

  }
}));

interface SettingsPanelProps {
  mode: 'light' | 'dark',
  show: boolean,
  handleClose: () => void,
  handleModeChange: (mode: 'light' | 'dark') => void,
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  mode,
  show,
  handleClose,
  handleModeChange,
}) => {
  const styles = useStyles();

  return (
    <section style={{ display: show ? "auto" : "none" }} className={styles.container}>
      <Grow in={show}>
        <Paper className={styles.content}>
          <header className={styles.header}>
            <Typography style={{ fontWeight: "bold" }} variant="h5" color="text">
              SETTINGS
            </Typography>
            <IconButton
              style={{ position: "absolute" }}
              className={styles.close}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </header>
          <div className={styles.settings}>
            <SettingsSwitch
              title="Dark Theme"
              value={mode === 'dark'}
              handleChange={() => handleModeChange(mode === 'light' ? 'dark' : 'light')}
            />
          </div>
        </Paper>
      </Grow>
    </section>
  )
}

const useSwitchStyles = makeStyles(theme => ({
  container: {
    borderBottom: "1px solid",
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0px",
  }
}))

interface SettingsSwitchProps {
  title: string,
  value: boolean,
  handleChange: () => void,
}

const SettingsSwitch: React.FC<SettingsSwitchProps> = ({
  title,
  value,
  handleChange,
}) => {
  const styles = useSwitchStyles();

  return (
    <div className={styles.container}>
      <Typography variant="body1" color="text">
        {title}
      </Typography>
      <Switch
        checked={value}
        onChange={handleChange}
        color="primary"
      />
    </div>
  )
}

export default SettingsPanel;