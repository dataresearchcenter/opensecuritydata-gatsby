import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { renderCell, onCellClick } from "./tableUtil"

const render = ({ field, value }) => renderCell(field, value)

const columns = [
  { field: "beneficiary_name", headerName: "Beneficiary", width: 400 },
  { field: "programme", headerName: "Programme", width: 200 },
  { field: "purpose", headerName: "Project", width: 300 },
  { field: "amount", headerName: "Amount", width: 100, renderCell: render },
  {
    field: "startDate",
    headerName: "Project start",
    width: 150,
    renderCell: render,
  },
  {
    field: "endDate",
    headerName: "Project end",
    width: 150,
    renderCell: render,
  },
  { field: "country", headerName: "Country", width: 100, renderCell: render },
  {
    field: "legalForm",
    headerName: "Legal form",
    width: 220,
    renderCell: render,
  },
  // { field: "summary", headerName: "Role" },
]

const PaymentsTable = ({ rows, exclude = [] }) => (
  <DataGrid
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
    pageSize={10}
    rowsPerPageOptions={[10, 25, 50, 100]}
    autoHeight
    disableSelectionOnClick
    hideFooter={rows.length < 11}
    onCellClick={onCellClick}
  />
)

export default PaymentsTable
