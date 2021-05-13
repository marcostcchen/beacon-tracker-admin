import { Button, CircularProgress, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './LoginScreen.css'

interface Props {
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const LoginScreen = (props: Props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" >
          <h2>Beacon Tracker Admin</h2>
          <div style={{ height: 100 }} />
          <TextField label="Login" placeholder="Login" variant="outlined" />
          <div style={{ height: 10 }} />
          <TextField label="Senha" placeholder="Senha" variant="outlined" />
          <div style={{ height: 30 }} />
          <Button className={classes.continueButton} variant="contained" onClick={() => setIsLoading(!isLoading)}>
            {!isLoading && "Entrar"}
            {isLoading && (
              <CircularProgress size={30} />
            )}
          </Button>
        </Grid>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    height: 800,
  },
  paper: {
    width: 300,
    height: 400,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  continueButton: {
    height: 40, 
    width: 100,
    padding: 5,
  }
}));