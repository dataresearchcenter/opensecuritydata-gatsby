import React from "react"
import DataTable, { renderCell, numericSort } from "./tableUtil"

const render = ({ field, value }) => renderCell(field, value)

const columns = [
  { field: "beneficiary_name", headerName: "Beneficiary", width: 400 },
  { field: "programme", headerName: "Programme", width: 200 },
  { field: "purpose", headerName: "Project", width: 300 },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    sortComparator: numericSort,
    renderCell: render,
  },
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
  <DataTable
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
  />
)

export default PaymentsTable
