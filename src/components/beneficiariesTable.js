import React from "react"
import { DataGrid } from "@material-ui/data-grid"
import { getBeneficiaryLink } from "../links"
import { renderCell, onCellClick } from "./tableUtil"

const render = ({ field, value }) => renderCell(field, value)

const columns = [
  { field: "name", headerName: "Name", width: 400 },
  {
    field: "total_amount",
    headerName: "Total amount",
    width: 150,
    renderCell: render,
  },
  { field: "projects", headerName: "Projects", width: 100 },
  {
    field: "startDate",
    headerName: "Active from",
    width: 150,
    renderCell: render,
  },
  {
    field: "endDate",
    headerName: "Active until",
    width: 150,
    renderCell: render,
  },
  { field: "country", headerName: "Country", renderCell: render, width: 100 },
  {
    field: "legalForm",
    headerName: "Legal form",
    renderCell: render,
    width: 220,
  },
]

const BeneficiariesTable = ({ rows }) => (
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10, 25, 50, 100]}
    autoHeight
    disableSelectionOnClick
    hideFooter={rows.length < 11}
    onCellClick={data => onCellClick(data, getBeneficiaryLink)}
  />
)

export default BeneficiariesTable
