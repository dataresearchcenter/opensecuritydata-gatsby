import React from "react"
import { navigate } from "gatsby"
import { getTagLink } from "../links"
import DataTable, { renderCell, numericSort } from "./tableUtil"

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 300,
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

const TagsTable = ({ rows, ...props }) => (
  <DataTable
    rows={rows}
    columns={columns}
    onRowClick={({ row }) => navigate(getTagLink(row))}
    {...props}
  />
)

export default TagsTable
