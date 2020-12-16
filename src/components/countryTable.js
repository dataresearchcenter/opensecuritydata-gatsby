import React from "react"
import { navigate } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"
import { getCountryLink } from "../links"
import Country from "./country"
import { renderCell } from "./tableUtil"

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 300,
    renderCell: ({ row }) => <Country {...row} />,
  },
  {
    field: "total_amount",
    headerName: "Total amount",
    width: 200,
    renderCell: ({ field, value }) => renderCell(field, value),
  },
  { field: "beneficiaries", headerName: "Beneficiaries" },
  { field: "projects", headerName: "Projects" },
]

const CountriesTable = ({ rows }) => (
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10, 25, 50, 100]}
    autoHeight
    disableSelectionOnClick
    hideFooter={rows.length < 11}
    onRowClick={({ row }) => navigate(getCountryLink(row))}
  />
)

export default CountriesTable
