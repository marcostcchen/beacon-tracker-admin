import { CircularProgress, makeStyles } from '@material-ui/core';
import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppBarHeader, AppDrawer } from './components';
import { AboutScreen, DashboardScreen, HistoricoScreen, HomeScreen, LoginScreen, MapaScreen } from './views';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var ls = require('local-storage');

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
    return (
      <Router>
        <Switch>
          <Route exact path="/"><LoginScreen setIsLogged={setIsLogged} /></Route>
          <Route exact path="/about"><AboutScreen /></Route>
        </Switch>
        <ToastContainer />
      </Router>
    )
  }

  return (
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
          <Route exact path="/about"><AboutScreen /></Route>
        </Switch>
      </div>
    </Router>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));
