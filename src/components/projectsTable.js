import React from "react"
import { navigate } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"
import { getProjectLink } from "../links"

const columns = [
  { field: "name", headerName: "Name", width: 400 },
  { field: "total_amount", headerName: "Total amount", width: 200 },
  { field: "beneficiaries", headerName: "Beneficiaries", width: 150 },
  { field: "programme", headerName: "Programme", width: 200 },
  { field: "startDate", headerName: "Project start", width: 150 },
  { field: "endDate", headerName: "Project end", width: 150 },
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
