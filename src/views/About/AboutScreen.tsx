import { Button, Grid, makeStyles, Paper } from "@material-ui/core"
import React from "react"

export const AboutScreen: React.FC = () => {
  const classes = useStyles();

  const openLink = (link: string) => {
    window.open(link, "_blank")
  }

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <Grid container direction="column" justify="center" alignItems="center" >
          <h1>Projeto Beacon Tracker</h1>

          <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
            <div style={{ width: '40%', textAlign: 'left', marginLeft: 10 }}>
              <h2>Links</h2>
              <div style={{ flexDirection: "row" }}>
                Banner
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  onClick={() => { openLink("https://drive.google.com/file/d/1AzozztGSIihOqnkA6dzx7_bnQHf-4naK/view?usp=sharing") }}
                >
                  Acessar
                </Button>
              </div>

              <div style={{ height: 10 }}></div>

              <div style={{ flexDirection: "row" }}>
                Press Release
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  onClick={() => { openLink("https://drive.google.com/file/d/1_V1IcBvSRIUwH_7En1_wTa98VcodjNdT/view?usp=sharing") }}
                >
                  Acessar
                </Button>
              </div>

              <div style={{ height: 10 }}></div>

              <div style={{ flexDirection: "row" }}>
                Monografia (em ajuste)
                <Button style={{ marginLeft: 10 }} variant="contained" disabled>Acessar</Button>
              </div>

            </div>

            <div style={{ width: '10%' }}></div>

            <div style={{ width: '50%', textAlign: 'left' }}>
              <h2>Projeto</h2>

              <div style={{ flexDirection: "row" }}>
                Api
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  onClick={() => openLink("https://api.beacontracker.software/index.html")}
                >
                  Acessar
                </Button>
              </div>

              <div style={{ height: 10 }}></div>

              <div style={{ flexDirection: "row" }}>
                Admin
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  onClick={() => openLink("https://admin.beacontracker.software/")}
                >
                  Acessar
                </Button>
                <p style={{marginTop: 0}}>
                  Acesso: MarcosAdmin/marcos123
                </p>
              </div>

              <h2>Repositórios</h2>
              <div style={{ flexDirection: "row" }}>
                App
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  onClick={() => openLink("https://github.com/marcostcchen/BeaconTrackerNative")}
                >
                  Acessar
                </Button>
              </div>

              <div style={{ height: 10 }}></div>

              <div style={{ flexDirection: "row" }}>
                Api
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  onClick={() => openLink("https://github.com/marcostcchen/BeaconTrackerApi")}
                >
                  Acessar
                </Button>
              </div>

              <div style={{ height: 10 }}></div>

              <div style={{ flexDirection: "row" }}>
                Admin
                <Button
                  style={{ marginLeft: 10 }}
                  variant="contained"
                  onClick={() => openLink("https://github.com/marcostcchen/beacon-tracker-admin")}
                >
                  Acessar
                </Button>
              </div>
            </div>
          </div>

        </Grid>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    height: 800,
  },
  paper: {
    width: 900,
    height: 500,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  continueButton: {
    height: 40,
    width: 100,
    padding: 5,
  }
}));