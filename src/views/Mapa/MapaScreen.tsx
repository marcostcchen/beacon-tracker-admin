import { Badge, Button, CircularProgress, Grid, makeStyles, TextField, Modal, Paper, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ImageMarker, { MarkerComponentProps } from 'react-image-marker';
import { TableStyles } from './styles';
import MapImage from '../../img/mapa.jpg';
import { Table } from '../../components';
import './MapaScreen.css'
import { Status } from '../../utils';
import { toast } from 'react-toastify';
import * as fetchUtils from './fetch';


interface TableUserRow {
  index: number,
  name: string,
  lastLocation: string,
  timeLeft: number,
  userId: string,
}

interface Props {

}

export const MapaScreen: React.FC<Props> = () => {
  const [tableUsersRows, setTableUsersRows] = useState<Array<TableUserRow>>([]);
  const classes = useStyles();
  const [markers, setMarkers] = useState<Array<MarkerComponentProps>>([]);
  const [sendNotificationUserIndex, setSendNotificationUserIndex] = useState(-1);
  const [notifTitulo, setNotifTitulo] = useState("");
  const [notifDescricao, setNotifDescricao] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalNotification, setIsOpenModalNotification] = useState(false);


  useEffect(() => {
    getUsersInfo();

    setInterval(() => {
      getUsersInfo();
    }, 8000)
  }, [])


  const columns: any = [
    {
      Header: 'id',
      accessor: 'index',
    },
    {
      Header: 'Nome',
      accessor: 'name',
    },
    {
      Header: 'Local',
      accessor: 'lastLocation',
    },
    {
      Header: 'T. Restante (s)',
      accessor: 'timeLeft',
    },
    {
      Header: 'Alerta',
      accessor: 'alert',
    },
  ]

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
    let newMarkers: Array<MarkerComponentProps> = [];

    let index = 1
    res.listUsuarios.forEach(user => {
      if (user.isWorking) {
        let startWorkingTime = new Date(user.startWorkingTime);
        let nowTime = new Date();

        let timeLeft = (startWorkingTime.getTime() + user.maxStayMinutes * 1000 - nowTime.getTime()) / 1000  //milisegundos 
        if (timeLeft < 0) timeLeft = 0;

        let tableUserRow: TableUserRow = {
          index: index,
          name: user.name,
          lastLocation: user.lastLocation.regionName,
          timeLeft: parseInt(timeLeft.toFixed(0)),
          userId: user.userId_OneSignal
        }

        listTableUsersRows.push(tableUserRow);
        index++;
      }

      let marker: MarkerComponentProps;
      if (user.lastLocation.regionName == "Freezer") {
        marker = { top: 60, left: 5, itemNumber: index }
        let lastMarker = newMarkers[newMarkers.length - 1];
        if (lastMarker && lastMarker.top == marker.top) {
          marker = {
            top: 30,
            left: Number(parseInt(lastMarker.left.toString()) + 5),
            itemNumber: index
          }
        }
      } else if (user.lastLocation.regionName == "Armazem de caixas") {
        marker = { top: 50, left: 50, itemNumber: index }
        let lastMarker = newMarkers[newMarkers.length - 1];
        if (lastMarker && lastMarker.top == marker.top) {
          marker = {
            top: 80,
            left: Number(parseInt(lastMarker.left.toString()) + 5),
            itemNumber: index
          }
        }
      } else {
        marker = { top: 10, left: 70, itemNumber: index }
        let lastMarker = newMarkers[newMarkers.length - 1];
        if (lastMarker && lastMarker.top == marker.top) {
          marker = {
            top: 10,
            left: Number(parseInt(lastMarker.left.toString()) + 5),
            itemNumber: index
          }
        }
      }
      newMarkers.push(marker);
    })

    setMarkers(newMarkers)
    setTableUsersRows(listTableUsersRows)
    setIsLoading(false)
  }

  const openEnviarNotificacaoModal = (index: number) => {
    setSendNotificationUserIndex(index);
    setIsOpenModalNotification(true);
  }

  const enviarNotificacao = async () => { //Roda so no chrome
    let userId = tableUsersRows.find(user => user.index == sendNotificationUserIndex)?.userId
    console.log(userId)
    if (userId) await fetchUtils.enviarNotificacao(notifTitulo, notifDescricao, userId);

    toast.success("Notificação enviada com sucesso!")
    setNotifTitulo("");
    setNotifDescricao("");
    setSendNotificationUserIndex(-1);
    setIsOpenModalNotification(false);
  }

  const CustomMarker = (props: MarkerComponentProps) => {
    const index = parseInt(props.itemNumber.toString());
    const name = tableUsersRows.find(tableUser => tableUser.index == index)?.name ?? ""
    return (
      <Tooltip title={name} placement="right">
        <Badge badgeContent={index} color="primary" />
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
            {markers.length > 0 && (
              <ImageMarker
                src={MapImage}
                markers={markers}
                markerComponent={CustomMarker}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <h3>Funcionários Ativos</h3>
            <TableStyles>
              <Table columns={columns} data={tableUsersRows} openEnviarNotificacaoModal={openEnviarNotificacaoModal} />
              {isLoading && (
                <CircularProgress size={30} style={{ marginTop: 20 }} />
              )}
            </TableStyles>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={isOpenModalNotification}
        onClose={() => setIsOpenModalNotification(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="Modal">
          <h2 >Criar notificação</h2>
          <p>Usuário: {tableUsersRows.find(user => user.index == sendNotificationUserIndex)?.name}</p>
          <div>
            <TextField style={{ width: 400 }} label="Titulo" value={notifTitulo} onChange={(e) => setNotifTitulo(e.target.value)} />
          </div>
          <div style={{ marginTop: 10 }}></div>
          <div>
            <TextField style={{ width: 400 }} label="Descrição" value={notifDescricao} onChange={(e) => setNotifDescricao(e.target.value)} />
          </div>

          <div style={{ marginTop: 40 }}></div>

          <Button variant="contained" style={{ marginRight: 30, backgroundColor: 'yellow' }} onClick={() => setIsOpenModalNotification(false)}>
            <span className="bold">Cancelar</span>
          </Button>

          <Button variant="contained" className="button" style={{ backgroundColor: 'green' }} onClick={enviarNotificacao}>
            <span style={{ color: 'white' }}>Enviar Notificação</span>
          </Button>
        </div>
      </Modal>
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