import { Badge, Container, Grid, makeStyles, Paper, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';
import { TableStyles } from './styles';
import MapImage from '../../img/mapa.jpg';
import { Table } from '../../components';
interface Props {

}

export const MapaScreen: React.FC<Props> = () => {
  const classes = useStyles();

  useEffect(() => {
    setInterval(() => {
      setMarkers([
        {
          top: 30, //10% of the image relative size from top
          left: 10, //50% of the image relative size from left
        },
      ])
    }, 10000)

  }, [])

  const data = React.useMemo(
    () => [
      {
        number: '1',
        name: 'Marcos',
      },
      {
        number: '2',
        name: 'Lucas',
      },
      {
        number: '3',
        name: 'Joao',
      },
    ], []
  )

  const columns: any = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'number', // accessor is the "key" in the data
      },
      {
        Header: 'Nome',
        accessor: 'name',
      },
    ],
    []
  )

  const [markers, setMarkers] = useState<Array<Marker>>(
    [
      {
        top: 30, //10% of the image relative size from top
        left: 15, //50% of the image relative size from left
      },
    ]);

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
    <div className={classes.root}>
      <Container>
        <h2>Mapa do frigorífico</h2>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Paper className={classes.paper}>
              <h3>Visão Geral</h3>
              <ImageMarker
                src={MapImage}
                markers={markers}
                markerComponent={CustomMarker}
              />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <TableStyles>
                <Table columns={columns} data={data} />
              </TableStyles>
            </Paper>
          </Grid>
        </Grid>
      </Container>
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