import React from "react"
import { navigate } from "gatsby"
import DataTable, { renderCell, numericSort } from "./tableUtil"
import { getProjectLink } from "../links"

const columns = [
  { field: "name", headerName: "Name", width: 400 },
  { field: "program", headerName: "Program", width: 200 },
  {
    field: "callName",
    headerName: "Call",
    width: 200,
  },
  {
    field: "workProgram",
    headerName: "Work program",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Total amount",
    width: 150,
    renderCell,
    sortComparator: numericSort,
  },
  {
    field: "beneficiaries",
    headerName: "Beneficiaries",
    width: 150,
    sortComparator: numericSort,
  },
  {
    field: "startDate",
    headerName: "Project start",
    width: 150,
    renderCell,
  },
  {
    field: "endDate",
    headerName: "Project end",
    width: 150,
    renderCell,
  },
]

const ProjectsTable = ({ rows, exclude = [], ...props }) => (
  <DataTable
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
    filters={["program", "workProgram", "callName"]}
    onRowClick={({ row }) => navigate(getProjectLink(row))}
    {...props}
  />
)

export default ProjectsTable
