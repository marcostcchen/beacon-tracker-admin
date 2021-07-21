import { Badge, CircularProgress, Grid, makeStyles, Paper, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';
import { TableStyles } from './styles';
import MapImage from '../../img/mapa.jpg';
import { Table } from '../../components';
import './MapaScreen.css'
import { Status } from '../../utils';
import { toast } from 'react-toastify';
import * as fetchUtils from './fetch';
import { UserLastLocation } from '../../models';


interface TableUserRow {
  name: string,
  lastLocation: string,
  timeLeft: number
}

interface Props {

}

export const MapaScreen: React.FC<Props> = () => {
  const [tableUsersRows, setTableUsersRows] = useState<Array<TableUserRow>>([]);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsersInfo();

    setInterval(() => {
      setMarkers([
        {
          top: 30, //10% of the image relative size from top
          left: 10, //50% of the image relative size from left
        },
      ])
    }, 10000)
  }, [])


  const columns: any = [
    {
      Header: 'Nome',
      accessor: 'name',
    },
    {
      Header: 'Local',
      accessor: 'lastLocation',
    },
    {
      Header: 'Tempo Restante (s)',
      accessor: 'timeLeft',
    }
  ]

  const [markers, setMarkers] = useState<Array<Marker>>(
    [
      {
        top: 30, //10% of the image relative size from top
        left: 15, //50% of the image relative size from left
      },
    ]);

  const getUsersInfo = async () => {
    setIsLoading(true)
    const res = await fetchUtils.listarUltimasLocalizacoes();

    if (!!!res) {
      setIsLoading(false)
      return;
    }

    if (res.status === Status.Error) {
      setIsLoading(false)
      toast.error(res.message, { position: "bottom-right" });
      return;
    }

    let listTableUsersRows: Array<TableUserRow> = [];

    res.listUsuarios.forEach(user => {
      if (user.isWorking) {
        let startWorkingTime = new Date(user.startWorkingTime);
        let nowTime = new Date();

        let timeLeft = (startWorkingTime.getTime() + user.maxStayMinutes*1000 - nowTime.getTime())/1000  //milisegundos 

        let tableUserRow: TableUserRow = {
          name: user.name,
          lastLocation: user.lastLocation.regionName,
          timeLeft: timeLeft
        }
        listTableUsersRows.push(tableUserRow);
      }
    })

    setTableUsersRows(listTableUsersRows)
    setIsLoading(false)
  }

  const CustomMarker = (props: MarkerComponentProps) => {
    const index = parseInt(props.itemNumber.toString());
    const number = index + 1;
    const name = "Marcos"
    return (
      <Tooltip title={name} placement="right">
        <Badge badgeContent={number} color="primary" />
      </Tooltip>
    );
  };

  return (
    <div className="DivMapa">
      <h2>Mapa</h2>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <h3>Funcionários por área</h3>
            <ImageMarker
              src={MapImage}
              markers={markers}
              markerComponent={CustomMarker}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <h3>Funcionários Ativos</h3>
            <TableStyles>
              <Table columns={columns} data={tableUsersRows} />
              {isLoading && (
                <CircularProgress size={30} style={{ marginTop: 20 }} />
              )}
            </TableStyles>
          </Paper>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h3>Descrição das regiões</h3>
            <TableDescricaoStyles>
              <Table columns={columns} data={data} />
            </TableDescricaoStyles>
          </Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  marker: {

  }
}));