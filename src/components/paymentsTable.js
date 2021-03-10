import React from "react"
import DataTable, {
  renderBeneficiary,
  renderCell,
  numericSort,
} from "./tableUtil"

const render = ({ field, value }) => renderCell(field, value)

const columns = [
  {
    field: "beneficiaryName",
    headerName: "Beneficiary",
    width: 400,
    renderCell: renderBeneficiary,
  },
  { field: "program", headerName: "Program", width: 200 },
  { field: "purpose", headerName: "Project", width: 300 },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    sortComparator: numericSort,
    renderCell: render,
  },
  {
    field: "startDate",
    headerName: "Project start",
    width: 150,
    renderCell: render,
  },
  {
    field: "endDate",
    headerName: "Project end",
    width: 150,
    renderCell: render,
  },
  { field: "country", headerName: "Country", width: 100, renderCell: render },
  {
    field: "legalForm",
    headerName: "Legal form",
    width: 220,
    renderCell: render,
  },
  { field: "role", headerName: "Role" },
]

const PaymentsTable = ({ rows, exclude = [], ...props }) => (
  <DataTable
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
    filters={["program", "country", "legalForm", "role"]}
    {...props}
  />
)

export default PaymentsTable
