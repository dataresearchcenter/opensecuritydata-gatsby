import React from "react"
import { getBeneficiaryLink } from "../links"
import DataTable, { renderCell, onCellClick, numericSort } from "./tableUtil"

const render = ({ field, value }) => renderCell(field, value)

const columns = [
  { field: "name", headerName: "Name", width: 400 },
  {
    field: "amount",
    headerName: "Total amount",
    width: 150,
    renderCell: render,
    sortComparator: numericSort,
  },
  {
    field: "projects",
    headerName: "Projects",
    width: 100,
    sortComparator: numericSort,
  },
  {
    field: "startDate",
    headerName: "Active from",
    width: 150,
    renderCell: render,
  },
  {
    field: "endDate",
    headerName: "Active until",
    width: 150,
    renderCell: render,
  },
  { field: "country", headerName: "Country", renderCell: render, width: 100 },
  {
    field: "legalForm",
    headerName: "Legal form",
    renderCell: render,
    width: 220,
  },
]

const BeneficiariesTable = ({ rows, ...props }) => (
  <DataTable
    rows={rows}
    columns={columns}
    filters={["country", "legalForm"]}
    onCellClick={data => onCellClick(data, getBeneficiaryLink)}
    {...props}
  />
)

export default BeneficiariesTable
