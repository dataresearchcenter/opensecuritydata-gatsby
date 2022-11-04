import React from "react"
import { graphql } from "gatsby"
import DataTable, {
  renderBeneficiary,
  renderCell,
  numericSort,
} from "./tableUtil"

const columns = [
  {
    field: "beneficiaryName",
    headerName: "Beneficiary",
    width: 400,
    renderCell: renderBeneficiary,
  },
  { field: "program", headerName: "Program", width: 200 },
  { field: "project", headerName: "Project", width: 300 },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    sortComparator: numericSort,
    renderCell,
  },
  {
    field: "startDate",
    headerName: "Project start",
    width: 150,
    renderCell,
  },
  {
    field: "endDate",
    headerName: "Project end",
    width: 150,
    renderCell,
  },
  { field: "country", headerName: "Country", width: 100, renderCell },
  {
    field: "legalForm",
    headerName: "Legal form",
    width: 250,
    renderCell,
  },
  { field: "role", headerName: "Role" },
]

const ParticipationsTable = ({ rows, exclude = [], ...props }) => (
  <DataTable
    rows={rows}
    columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
    filters={["program", "country", "legalForm", "role"]}
    {...props}
  />
)

export default ParticipationsTable

export const query = graphql`
  fragment ParticipationFragment on ParticipationsJson {
    id
    beneficiaryName
    program
    project
    amount
    amountOrig
    currency
    startDate
    endDate
    legalForm
    country
  }
`
