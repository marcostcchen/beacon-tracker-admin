import { Button, CircularProgress, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import { useState } from 'react'
import { tokenKey, userKey } from '../../utils';

import * as fetch from './fetch';
import './LoginScreen.css'
var ls = require('local-storage');
interface Props {
  setIsLogged: (isLogged: boolean) => void,
}

export const LoginScreen = (props: Props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogged } = props;

  const makeLogin = async () => {
    setIsLoading(true)
    const efetuarLoginResponse = await fetch.efetuarLogin(login, password);

    if (!!!efetuarLoginResponse) {
      setIsLogged(false);
      setIsLoading(false)
      return;
      //ocorreu um erro inesperado
    }

    ls.set(userKey, JSON.stringify(efetuarLoginResponse.user));
    ls.set(tokenKey, efetuarLoginResponse.token);
    setTimeout(() => {
      setIsLoading(false);
      setIsLogged(true);
    }, 1000)
  }

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" >
          <h2>Beacon Tracker Admin</h2>
          <div style={{ height: 100 }} />
          <TextField label="Login" placeholder="Login" variant="outlined" onChange={(event) => setLogin(event.target.value)} />
          <div style={{ height: 10 }} />
          <TextField label="Senha" placeholder="Senha" variant="outlined" type="password" onChange={(event) => setPassword(event.target.value)} />
          <div style={{ height: 30 }} />
          <Button className={classes.continueButton} variant="contained" onClick={makeLogin}>
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