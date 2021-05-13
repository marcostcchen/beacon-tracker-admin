import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppDrawer } from './components';
import { AboutScreen, HomeScreen, LoginScreen } from './views';

export const App = () => {
  const classes = useStyles();
  const [token, setToken] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const closeDrawer = () => {
    setIsOpenDrawer(false)
  }

  const openDrawer = () => {
    setIsOpenDrawer(true)
  }

  const logout = () => {
    setToken("");
  }

  if (token === '') {
    return <LoginScreen setToken={setToken} />
  }

  return (
    <>
      <Router>
        <div>
          <nav>
            <div className={classes.root}>
              <AppDrawer isOpenDrawer={isOpenDrawer} closeDrawer={closeDrawer} />
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openDrawer}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Beacon Tracker Admin
                </Typography>
                  <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
              </AppBar>
            </div>
          </nav>

          <Switch>
            <Route path="/about">
              <AboutScreen />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
