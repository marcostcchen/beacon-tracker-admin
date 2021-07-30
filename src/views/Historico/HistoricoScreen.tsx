import { DataGrid, GridColDef } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'
import Collapsible from 'react-collapsible'
import "./HistoricoScreen.css"
import * as fetchUtils from './fetch';
import { formatDateHour, Status } from '../../utils';
import { toast } from 'react-toastify';
import { UserWorkSession } from '../../models';

interface Props {

}

const columns: GridColDef[] = [
  { field: 'regionName', headerName: 'Região', width: 150 },
  { field: 'startWorkingTime', headerName: 'Início', width: 200, },
  { field: 'startRestingTime', headerName: 'Início Descanço', width: 200, },
  { field: 'finishRestingTime', headerName: 'Fim Descanço', width: 200, },
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
    setListUserWorkSession(res.usersWorkingSessions); 
  }

  return (
    <div className="DivHistorico">
      <h2>Histórico de usuários</h2>
      <div style={styles.container}>
        {listUserWorkSession.map((userWorkSession, index) => {
          let rows: any = [];
          userWorkSession.listWorkSessions.map(workSession => {
            let row = {
              id: index + 1 + Math.random(),
              regionName: workSession.regionName,
              maxStayMinutes: workSession.maxStayMinutes,
              minRestMinutes: workSession.minRestMinutes,
              startWorkingTime: formatDateHour(workSession.startWorkingTime),
              startRestingTime: formatDateHour(workSession.startRestingTime),
              finishRestingTime: formatDateHour(workSession.finishRestingTime)
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

