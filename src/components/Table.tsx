import { Button } from "@material-ui/core";
import { useTable } from "react-table";

interface Props {
  columns: any,
  data: any,
  openEnviarNotificacaoModal: (index: number) => void,
}

export const Table: React.FC<Props> = (props) => {
  // Use the state and functions returned from useTable to build your UI
  const { columns, data, openEnviarNotificacaoModal } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()} style={{width: "100%"}}>
      <thead>
        {headerGroups.map((headerGroup: any, i: number) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, index: number) => (
              <th key={index} style={{ fontSize: 14 }} {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, ind) => {
          prepareRow(row)
          return (
            <tr  {...row.getRowProps()}>
              {row.cells.map((cell, inde) => {
                if (cell.column.Header === "Alerta") {
                  return (
                    <td key={inde}>
                      <Button
                        variant="contained"
                        style={{ fontSize: 10, padding: 5 }}
                        onClick={() => { openEnviarNotificacaoModal(ind + 1) }}
                      >
                        Enviar Notificação
                      </Button>
                    </td>
                  )
                }

                const color = cell.value == 0 ? "#ffcccb" : "";
                return <td style={{ backgroundColor: color, fontSize: 14 }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
