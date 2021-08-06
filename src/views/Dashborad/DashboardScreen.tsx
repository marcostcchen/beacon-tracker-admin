import * as React from 'react'
import "./DashboardScreen.css"

interface Props {

}

export const DashboardScreen: React.FC<Props> = () => {
  return (
    <div className="DivDetalhe">
      <h1>Dashboard</h1>

      <iframe title="" width="30%" height="170" style={styles.boxWithMargin} src="https://charts.mongodb.com/charts-tcc-cmmcu/embed/charts?id=07fc7040-0ceb-476d-9e31-efcc35d4893f&autoRefresh=60&theme=light"></iframe>
      <iframe title="" width="23%" height="170" style={styles.boxWithMargin} src="https://charts.mongodb.com/charts-tcc-cmmcu/embed/charts?id=a07b453f-3a97-4b3b-be02-ede645323d20&autoRefresh=60&theme=light"></iframe>
      <iframe title="" width="22%" height="170" style={styles.boxWithMargin} src="https://charts.mongodb.com/charts-tcc-cmmcu/embed/charts?id=92fbd5e0-90a3-4a8d-a8f5-024cb1d49c68&autoRefresh=60&theme=light"></iframe>
      <iframe title="" width="22%" height="170" style={styles.box} src="https://charts.mongodb.com/charts-tcc-cmmcu/embed/charts?id=b17e060e-5179-47b3-a6d4-d2a047a3d07b&autoRefresh=60&theme=light"></iframe>

      <iframe title="" width="100%" height="350" style={styles.box} src="https://charts.mongodb.com/charts-tcc-cmmcu/embed/charts?id=872a54f3-7321-4fa1-9057-ab398d69ba09&autoRefresh=60&theme=light"></iframe>

      <iframe title="" width="50%" height="350" style={styles.boxWithMargin} src="https://charts.mongodb.com/charts-tcc-cmmcu/embed/charts?id=6b549589-b0bc-46d7-a1fe-e839cc7aa621&autoRefresh=60&theme=light"></iframe>
      <iframe title="" width="49%" height="350" style={styles.box} src="https://charts.mongodb.com/charts-tcc-cmmcu/embed/charts?id=57278d7e-3ea0-44d6-a292-64e2398d5b67&autoRefresh=60&theme=light"></iframe>
    </div >
  )
}

const styles = {
  box: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: 2,
    boxShadow: '0px 2px 10px 0px rgba(70, 76, 79, .2)'
  },
  boxWithMargin: {
    marginTop: 5,
    marginRight: '1%',
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: 2,
    boxShadow: '0px 2px 10px 0px rgba(70, 76, 79, .2)'
  }
}



