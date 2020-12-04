import React from "react"
import { navigate } from "gatsby"
import slugify from "slugify"
import { DataGrid } from "@material-ui/data-grid"
import DataDownload from "../components/downloadData"

const columns = [
  { field: "name", headerName: "Name", width: 400 },
  { field: "total_amount", headerName: "Total amount", width: 200 },
  { field: "beneficiaries", headerName: "Beneficiaries" },
  { field: "programme", headerName: "Programme", width: 200 },
]

const ProjectsTable = ({ rows, proof, exclude = [] }) => (
  <>
    <DataDownload {...proof} />
    <DataGrid
      rows={rows}
      columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
      pageSize={10}
      rowsPerPageOptions={[10, 25, 50, 100]}
      autoHeight
      disableSelectionOnClick
      hideFooter={rows.length < 11}
      onRowClick={({ row: { name } }) => navigate(`/projects/${slugify(name)}`)}
    />
  </>
)

export default ProjectsTable
