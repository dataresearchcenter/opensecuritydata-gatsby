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
    field: "amount",
    headerName: "Total amount",
    width: 200,
    renderCell,
    sortComparator: numericSort,
  },
  {
    field: "beneficiaries",
    headerName: "Beneficiaries",
    width: 200,
    sortComparator: numericSort,
  },
  {
    field: "projects",
    headerName: "Projects",
    width: 200,
    sortComparator: numericSort,
  },
  {
    field: "startDate",
    headerName: "Activity start",
    width: 150,
    renderCell,
  },
  {
    field: "endDate",
    headerName: "Activity end",
    width: 150,
    renderCell,
  },
]

const CountriesTable = ({ rows, ...props }) => (
  <DataTable
    rows={rows}
    columns={columns}
    onRowClick={({ row }) => navigate(getCountryLink(row))}
    {...props}
  />
)

export default CountriesTable
