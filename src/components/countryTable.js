import React from "react"
import { navigate } from "gatsby"
import { getCountryLink } from "../links"
import Country from "./country"
import DataTable, { renderCell, numericSort } from "./tableUtil"

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
    sortComparator: numericSort,
  },
  {
    field: "beneficiaries",
    headerName: "Beneficiaries",
    sortComparator: numericSort,
  },
  { field: "projects", headerName: "Projects", sortComparator: numericSort },
]

const CountriesTable = ({ rows }) => (
  <DataTable
    rows={rows}
    columns={columns}
    onRowClick={({ row }) => navigate(getCountryLink(row))}
  />
)

export default CountriesTable
