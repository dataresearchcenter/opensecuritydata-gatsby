import React from "react"
import { navigate } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"
import { renderCell, numericSort } from "./tableUtil"
import { getProjectLink } from "../links"

const render = ({ field, value }) => renderCell(field, value)

const columns = [
  { field: "name", headerName: "Name", width: 400 },
  {
    field: "total_amount",
    headerName: "Total amount",
    width: 150,
    renderCell: render,
    sortComparator: numericSort,
  },
  {
    field: "beneficiaries",
    headerName: "Beneficiaries",
    width: 150,
    sortComparator: numericSort,
  },
  { field: "programme", headerName: "Programme", width: 200 },
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
]

const ProjectsTable = ({ rows, exclude = [] }) => (
  <DataGrid
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
    pageSize={10}
    rowsPerPageOptions={[10, 25, 50, 100]}
    autoHeight
    disableSelectionOnClick
    hideFooter={rows.length < 11}
    onRowClick={({ row }) => navigate(getProjectLink(row))}
  />
)

export default ProjectsTable
