import React from "react"
import DataTable, {
  renderBeneficiary,
  renderCell,
  numericSort,
} from "./tableUtil"

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 400,
    renderCell: renderBeneficiary,
  },
  {
    field: "amount",
    headerName: "Total amount",
    width: 150,
    renderCell,
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
    renderCell,
  },
  {
    field: "endDate",
    headerName: "Active until",
    width: 150,
    renderCell,
  },
  { field: "country", headerName: "Country", renderCell, width: 100 },
  {
    field: "legalForm",
    headerName: "Legal form",
    renderCell,
    width: 220,
  },
]

const BeneficiariesTable = ({ rows, exclude = [], ...props }) => (
  <DataTable
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
    filters={["country", "legalForm"]}
    beneficiaryField="name"
    {...props}
  />
)

export default BeneficiariesTable
