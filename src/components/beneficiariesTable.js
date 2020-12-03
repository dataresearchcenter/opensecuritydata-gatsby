import React from "react"
import slugify from "slugify"
import { navigate } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"

const columns = [
  { field: "name", headerName: "Name", width: 400 },
  { field: "total_amount", headerName: "Total amount", width: 200 },
  { field: "projects", headerName: "Projects involved" },
  { field: "startDate", headerName: "Active from" },
  { field: "endDate", headerName: "Active until" },
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
    onRowClick={({ data }) => navigate(`/beneficiary/${slugify(data.name)}`)}
  />
)

export default BeneficiariesTable

