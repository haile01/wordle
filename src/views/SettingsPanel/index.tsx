import { Close } from '@mui/icons-material';
import { Grow, IconButton, Paper, Switch, Typography, FormControl, FormLabel, FormHelperText, TextField, Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

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
  settings: {

  }
}));

interface SettingsPanelProps {
  mode: 'light' | 'dark',
  show: boolean,
  handleClose: () => void,
  handleModeChange: (mode: 'light' | 'dark') => void,
  letterCount: number,
  setLetterCount: (count: number) => void,
  // rowCount: number,
  // setRowCount: (count: number) => void,
  startNewGame: (count: number) => Promise<void>,
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  mode,
  show,
  handleClose,
  handleModeChange,
  letterCount,
  setLetterCount,
  // rowCount,
  // setRowCount,
  startNewGame
}) => {
  const styles = useStyles();

  const [_letterCount, _setLetterCount] = useState(letterCount);
  // const [_rowCount, _setRowCount] = useState(rowCount);
  const [loading, setLoading] = useState(false);

  const handleRestart = async () => {
    setLetterCount(_letterCount);
    // setRowCount(_rowCount);
    setLoading(true);
    await startNewGame(_letterCount);
    setLoading(false);
    handleClose();
  }

  return (
    <section style={{ display: show ? "initial" : "none" }} className={styles.placeholder}>
      <Grow in={show}>
        <Paper className={styles.container}>
          <div className={styles.content}>
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
              <SettingsInput
                type="number"
                title="Word length"
                value={_letterCount}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => _setLetterCount(parseInt(e.target.value))}
                inputProps={{
                  max: 10,
                  min: 5,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleRestart}
              >
                Start new game {loading && <Grow in={loading}><CircularProgress size={24} /></Grow>}
              </Button>
            </div>
          </div>
        </Paper>
      </Grow>
    </section>
  )
}

const useSwitchStyles = makeStyles(theme => ({
  container: {
    margin: "5px 0px",
    padding: "5px 0px",
    borderBottom: "1px solid",
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
      <Typography style={{ fontWeight: "bold" }} variant="h6" color="text">
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

const useInputStyles = makeStyles(theme => ({
  container: {
    margin: "5px 0px",
    padding: "5px 0px",
    borderBottom: "1px solid",
    width: "100%",
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}))

interface SettingsInputProps {
  type: string,
  title: string,
  value: any,
  placeholder?: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  inputProps?: any,
}

const SettingsInput: React.FC<SettingsInputProps> = ({
  type,
  title,
  value,
  placeholder,
  handleChange,
  inputProps
}) => {

  const styles = useInputStyles();
  
  return (
    <div className={styles.container}>
      <Typography style={{ fontWeight: "bold" }} variant="h6" color="text">
        {title}
      </Typography>
      <FormControl>
        <TextField
          type="number"
          value={value}
          variant="outlined"
          placeholder={placeholder || ""}
          onChange={handleChange}
          inputProps={inputProps}
        />
      </FormControl>
    </div>
  )
}

export default SettingsPanel;