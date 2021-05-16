import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';

interface Props {
  logout: () => void,
  openDrawer: () => void
}

export const AppBarHeader = (props: Props) => {
  const classes = useStyles();
  const { logout, openDrawer } = props;
  return (
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
  )
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
