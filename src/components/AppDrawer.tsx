import { Drawer, List, ListItem, Divider, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Inbox"} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/about')}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Main"} />
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