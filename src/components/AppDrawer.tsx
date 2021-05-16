import { Drawer, List, ListItem, Divider, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import { Home, Equalizer, Room, RestorePage } from '@material-ui/icons';

import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { userKey } from '../utils';
import { User } from '../models';
var ls = require('local-storage');

interface Props {
  isOpenDrawer: boolean
  closeDrawer: () => void
}

export const AppDrawer = (props: Props) => {
  const { isOpenDrawer, closeDrawer } = props;
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");

  useEffect(() => {
    const user: User = JSON.parse(ls.get(userKey))
    setName(user.name);
  }, [])

  const navigateTo = (path: string) => {
    closeDrawer();
    history.push(path);
  }

  return (
    <Drawer open={isOpenDrawer} onClose={closeDrawer} role="presentation">
      <div className={classes.list} >
        <List>
          <ListItem>
            <h2>Ola! {name}</h2>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/dashboard')}>
            <ListItemIcon>
              <Equalizer />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/mapa')}>
            <ListItemIcon>
              <Room />
            </ListItemIcon>
            <ListItemText primary={"Mapa"} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/historico')}>
            <ListItemIcon>
              <RestorePage />
            </ListItemIcon>
            <ListItemText primary={"Historico"} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});