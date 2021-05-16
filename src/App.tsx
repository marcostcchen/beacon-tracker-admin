import { makeStyles } from '@material-ui/core';
import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppBarHeader, AppDrawer } from './components';
import { DashboardScreen, HistoricoScreen, HomeScreen, LoginScreen, MapaScreen } from './views';

export const App = () => {
  const classes = useStyles();
  const [isLogged, setIsLogged] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const closeDrawer = () => {
    setIsOpenDrawer(false)
  }

  const openDrawer = () => {
    setIsOpenDrawer(true)
  }

  const logout = () => {
    setIsLogged(false);
  }

  if (!isLogged) {
    return <LoginScreen setIsLogged={setIsLogged} />
  }

  return (
    <>
      <Router>
        <div>
          <nav>
            <div className={classes.root}>
              <AppDrawer isOpenDrawer={isOpenDrawer} closeDrawer={closeDrawer} />
              <AppBarHeader logout={logout} openDrawer={openDrawer} />
            </div>
          </nav>

          <Switch>
            <Route path="/"><HomeScreen /></Route>
            <Route path="/dashboard"><DashboardScreen /></Route>
            <Route path="/mapa"><MapaScreen /></Route>
            <Route path="/historico"><HistoricoScreen /></Route>
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
