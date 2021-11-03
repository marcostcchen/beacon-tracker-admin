import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Collapsible from 'react-collapsible'
import "./HistoricoScreen.css"
import * as fetchUtils from './fetch';
import { convertWorkingSessionToString, formatDate, formatDateHour, Status } from '../../utils';
import { toast } from 'react-toastify';
import { UserWorkSession } from '../../models';
import { CSVLink } from "react-csv";

interface Props {

}

const columns: GridColDef[] = [
  { field: 'regionName', headerName: 'Região', width: 200 },
  { field: 'status', headerName: 'Operação', width: 160 },
  { field: 'time', headerName: 'Tempo da Operação', width: 300 },
  { field: 'startTime', headerName: 'Início', width: 200, },
  { field: 'measureTime', headerName: 'Horário Medição', width: 200, },
];

const rowsHeader = [
  'regionName',
  'status',
  'time',
  'startTime',
  'measureTime',
]

export const HistoricoScreen: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listUserWorkSession, setListUserWorkSession] = useState<Array<UserWorkSession>>([])

  useEffect(() => {
    setInterval(() => {
      getListWorkingSessions();
    }, 5000)

    getListWorkingSessions();
  }, [])

  const getListWorkingSessions = async () => {
    setIsLoading(true);

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
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <h2 style={{ width: '20%' }}>Histórico de usuários</h2>
        {isLoading && (
          <div style={{ width: '30%', display: 'flex', alignItems: 'center', }}>
            <CircularProgress size={30} />
          </div>
        )}
      </div>

      <div style={styles.container}>
        {listUserWorkSession.map((userWorkSession, index) => {
          let rows: any = [];
          userWorkSession.listWorkSessions.map(workSession => {
            let row = {
              id: index + 1 + Math.random(),
              regionName: workSession.regionName,
              time: ((new Date(workSession.measureTime).getTime() - new Date(workSession.startTime).getTime()) / (1000 * 60)).toFixed(2) + ' min',
              status: convertWorkingSessionToString(workSession.status),
              measureTime: formatDateHour(workSession.measureTime),
              startTime: formatDateHour(workSession.startTime)
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
              <CSVLink
                separator={";"}
                data={rows}
                headers={rowsHeader}
                filename={`${userWorkSession.name}_${formatDate((new Date).toString()).replaceAll("/", "").replaceAll(":", "")}.csv`}
                style={{ marginLeft: 5 }}
              >
                Baixar
              </CSVLink>
              <div style={{ height: 600, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={100} />
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

