import { Button, CircularProgress, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import { useState } from 'react'
import { efetuarLogin, Status, tokenKey, userKey } from '../../utils';

import { Place } from '@material-ui/icons';
import { toast } from 'react-toastify';

import './LoginScreen.css'
import { User } from '../../models';
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
    const efetuarLoginResponse = await efetuarLogin(login, password);

    if (!!!efetuarLoginResponse) {
      setIsLogged(false);
      setIsLoading(false)
      return;
    }

    if (efetuarLoginResponse.status === Status.Error) {
      setIsLogged(false);
      setIsLoading(false)
      toast.error(efetuarLoginResponse.message, { position: "bottom-right" });
      return;
    }

    let user: User = {
      ...efetuarLoginResponse.user,
      login: login,
      password: password
    }

    ls.set(userKey, JSON.stringify(user));
    ls.set(tokenKey, 'bearer ' + efetuarLoginResponse.token);
    setTimeout(() => {
      setIsLoading(false);
      setIsLogged(true);
    }, 1000)
  }

  const handleEnter = (ev: any) => {
    if (ev.key === 'Enter') {
      makeLogin()
    }
  }

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" >
          <h1>Beacon Tracker Admin</h1>

          <Place style={{ fontSize: 120 }} />
          <div style={{ height: 20 }} />

          <div style={{ width: '80%', margin: "0 auto 0" }}>
            <TextField fullWidth label="Login" placeholder="Login" variant="outlined" onChange={(event) => setLogin(event.target.value)} />
            <div style={{ height: 10 }} />

            <TextField fullWidth label="Senha" placeholder="Senha" variant="outlined" type="password" onChange={(event) => setPassword(event.target.value)} onKeyPress={handleEnter} />
            <div style={{ height: 30 }} />
          </div>

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
    width: 400,
    height: 450,
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