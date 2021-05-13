import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AboutScreen, HomeScreen, LoginScreen } from './views';

export const App = () => {
  const classes = useStyles();
  const [token, setToken] = useState('');

  if (token === '') {
    return <LoginScreen setToken={setToken}/>
  }

  return (
    <Router>
      <div>
        <nav>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  News
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
        </nav>

        {/*Este switch define as rotas, para quais rotas vao quais componentes (telas) */}
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
