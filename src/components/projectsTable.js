import React from "react"
import { navigate } from "gatsby"
import DataTable, { renderCell, numericSort } from "./tableUtil"
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
  <DataTable
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
    filters={["programme"]}
    onRowClick={({ row }) => navigate(getProjectLink(row))}
  />
)

export default ProjectsTable
