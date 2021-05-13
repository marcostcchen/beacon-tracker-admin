import { Drawer, List, ListItem, Divider, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router';

interface Props {
  isOpenDrawer: boolean
  closeDrawer: () => void
}

export const AppDrawer = (props: Props) => {
  const { isOpenDrawer, closeDrawer } = props;
  const classes = useStyles();
  const history = useHistory();

  const navigateTo = (path: string) => {
    closeDrawer();
    history.push(path);
  }

  return (
    <Drawer open={isOpenDrawer} onClose={closeDrawer} role="presentation">
      <div className={classes.list} >
        <List>
          <ListItem>
            <h2>Ola! User</h2>
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