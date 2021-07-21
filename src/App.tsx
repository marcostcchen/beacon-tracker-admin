import { CircularProgress, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppBarHeader, AppDrawer } from './components';
import { DashboardScreen, HistoricoScreen, HomeScreen, LoginScreen, MapaScreen } from './views';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { efetuarLogin, Status, tokenKey, userKey } from './utils';
import { User } from './models';
var ls = require('local-storage');

export const App = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    const validateLogin = async () => {
      const user: User | null = ls.get(userKey)
      
      if (user != null) {
        const efetuarLoginResponse = await efetuarLogin(user.login, user.password);
        if (!!!efetuarLoginResponse) {
          setIsLogged(false);
          setIsLoading(false);
          return;
        }

        if (efetuarLoginResponse.status === Status.Error) {
          setIsLogged(false);
          setIsLoading(false);
          toast.error(efetuarLoginResponse.message, { position: "bottom-right" });
          return;
        }

        ls.set(tokenKey, efetuarLoginResponse.token);
        setIsLogged(true);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    validateLogin();
  }, [])

  const closeDrawer = () => {
    setIsOpenDrawer(false)
  }

  const openDrawer = () => {
    setIsOpenDrawer(true)
  }

  const logout = () => {
    setIsLogged(false);
  }

  if (isLoading) {
    return (
      <div className={classes.root}>
        <div style={{ width: '100%', height: 800, margin: "0 auto 0" }}>
          <CircularProgress size={30} />
        </div>
      </div>
    )
  }

  if (!isLogged) {
    return (
      <>
        <LoginScreen setIsLogged={setIsLogged} />
        <ToastContainer />
      </>
    )
  }

  return (
    <>
      <Router>
        <div>
          <nav>
            <div className={classes.root}>
              <AppDrawer isOpenDrawer={isOpenDrawer} closeDrawer={closeDrawer} />
              <AppBarHeader logout={logout} openDrawer={openDrawer} />
              <ToastContainer />
            </div>
          </nav>

          <Switch>
            <Route exact path="/"><HomeScreen /></Route>
            <Route exact path="/dashboard"><DashboardScreen /></Route>
            <Route exact path="/mapa"><MapaScreen /></Route>
            <Route exact path="/historico"><HistoricoScreen /></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));
