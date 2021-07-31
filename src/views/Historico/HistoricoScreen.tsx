import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Collapsible from 'react-collapsible'
import "./HistoricoScreen.css"
import * as fetchUtils from './fetch';
import { formatDate, formatDateHour, formatHour, Status } from '../../utils';
import { toast } from 'react-toastify';
import { UserWorkSession } from '../../models';

interface Props {

}

const columns: GridColDef[] = [
  { field: 'regionName', headerName: 'Região', width: 160 },
  { field: 'date', headerName: 'Data', width: 120 },
  { field: 'startWorkingTime', headerName: 'Início', width: 120, },
  { field: 'startRestingTime', headerName: 'I.Descanso', width: 160, },
  { field: 'finishRestingTime', headerName: 'F.Descanso', width: 160, },
  { field: 'workedTime', headerName: 'T.Trabalhado(s)', width: 180, },
  { field: 'restedTime', headerName: 'T.Descansado(s)', width: 190, },
  { field: 'maxStayMinutes', headerName: 'T.Máx.Permitido(s)', width: 200 },
  { field: 'minRestMinutes', headerName: 'T.Mín.Descanso(s)', width: 200, },
];

export const HistoricoScreen: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listUserWorkSession, setListUserWorkSession] = useState<Array<UserWorkSession>>([])

  useEffect(() => {
    getListWorkingSessions();
  }, [])

  const getListWorkingSessions = async () => {
    const res = await fetchUtils.listWorkingSessions();
    if (!!!res) {
      setIsLoading(false)
      return;
    }

    if (res.status === Status.Error) {
      setIsLoading(false)
      toast.error(res.message, { position: "bottom-right" });
      return;
    }

    setIsLoading(false)
    setListUserWorkSession(res.usersWorkingSessions);
  }

  return (
    <div className="DivHistorico">
      <h2>Histórico de usuários</h2>
      {isLoading && (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={30} />
        </div>
      )}

      {!isLoading && (
        <div style={styles.container}>
          {listUserWorkSession.map((userWorkSession, index) => {
            let rows: any = [];
            userWorkSession.listWorkSessions.map(workSession => {
              let row = {
                id: index + 1 + Math.random(),
                regionName: workSession.regionName,
                maxStayMinutes: workSession.maxStayMinutes,
                minRestMinutes: workSession.minRestMinutes,
                workedTime: ((new Date(workSession.startRestingTime).getTime() - new Date(workSession.startWorkingTime).getTime())/1000).toFixed(0),
                restedTime: ((new Date(workSession.finishRestingTime).getTime() - new Date(workSession.startRestingTime).getTime())/1000).toFixed(0),
                date: formatDate(workSession.startWorkingTime), 
                startWorkingTime: formatHour(workSession.startWorkingTime),
                startRestingTime: formatHour(workSession.startRestingTime),
                finishRestingTime: formatHour(workSession.finishRestingTime)
              }
              rows.push(row);
            })

            return (
              <Collapsible key={index} trigger={
                <div style={styles.title}>
                  <div style={{ width: "79%" }}>{userWorkSession.name}</div>
                  <div style={{ width: "20%", textAlign: 'right' }}>v</div>
                </div>
              }>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid rows={rows} columns={columns} pageSize={5} />
                </div>
              </Collapsible>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles: any = {
  container: {
    border: '1px solid black',
    width: '100%',
  },
  title: {
    width: "98.5%",
    padding: 10,
    borderBottom: '1px solid black',
    flexDirection: 'row',
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: '#3f51b563'
  }
}

