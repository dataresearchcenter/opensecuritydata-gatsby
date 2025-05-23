import React from "react"
import { navigate } from "gatsby"
import { getTopicLink } from "../links"
import DataTable, { renderCell, numericSort } from "./tableUtil"

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 400,
  },
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
]

const TopicsTable = ({ rows, ...props }) => (
  <DataTable
    rows={rows}
    columns={columns}
    filters={["callName", "workProgram"]}
    onRowClick={({ row }) => navigate(getTopicLink(row))}
    {...props}
  />
)

export default TopicsTable
