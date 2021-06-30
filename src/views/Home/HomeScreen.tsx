import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, GridSpacing } from '@material-ui/core'
import DashboardIcon from '../../img/DashboardIcon.png';
import HistoricoIcon from '../../img/HistoricoIcon.png';
import MapaIcon from '../../img/MapaIcon.png';

import './HomeScreen.css'

interface Props {

}

export const HomeScreen: React.FC<Props> = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        height: 200,
        width: 200,
      },
      control: {
        padding: theme.spacing(2),
      },
    }),
  );

  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  return (
    <div className="DivHome">
      <h1>Bem vindo ao Beacon Tracker Administrador</h1>
      <div>Aqui você pode visualizar dashboards de análises estratégicas, monitorar os funcionários presentes no local, enviar notificações de alertas e visualizar histórico de cada usuário</div>

      <div style={{ marginTop: 100 }} />
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center" spacing={spacing}>
            <Grid style={styles.grid} item>
              <img style={styles.icons} src={DashboardIcon} alt="Dashboard Icon" />
              <p style={styles.p}>Dashboard</p>
            </Grid>
            <Grid style={styles.grid} item>
              <img style={styles.icons} src={HistoricoIcon} alt="Historico Icon" />
              <p style={styles.p}>Histórico</p>
            </Grid>
            <Grid style={styles.grid} item>
              <img style={styles.icons} src={MapaIcon} alt="Mapa Icon" />
              <p style={styles.p}>Mapa</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const styles: any = {
  icons: {
    height: 140,
  },
  grid: {
    padding: 20,
    marginLeft: 40, 
    marginRight: 40
  },
  p: {
    textAlign: 'center'
  }
}