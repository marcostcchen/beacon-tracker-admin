import { DataGrid, GridColDef } from '@material-ui/data-grid'
import * as React from 'react'
import Collapsible from 'react-collapsible'
import "./HistoricoScreen.css"
interface Props {

}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 300 },
  { field: 'lastName', headerName: 'Last name', width: 300 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 300,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const HistoricoScreen: React.FC<Props> = () => {
  return (
    <div className="DivHistorico">
      <h2>Histórico de usuários</h2>
      <div style={containerStyles}>
        <Collapsible trigger="Start here +">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
          </div>
        </Collapsible>
      </div>
    </div>
  )
}

const containerStyles: React.CSSProperties = {
  border: '1px solid black',
  padding: 10,
  borderRadius: 10,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}