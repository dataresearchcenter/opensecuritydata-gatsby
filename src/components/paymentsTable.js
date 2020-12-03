import React from "react"
import slugify from "slugify"
import { navigate } from "gatsby"
import { DataGrid } from "@material-ui/data-grid"
import DataDownload from "../components/downloadData"

const columns = [
  { field: "beneficiary_name", headerName: "Beneficiary", width: 400 },
  { field: "programme", headerName: "Programme", width: 200 },
  { field: "purpose", headerName: "Project", width: 200 },
  { field: "amount", headerName: "Amount", width: 100 },
  { field: "startDate", headerName: "Project start" },
  { field: "endDate", headerName: "Project end" },
  // { field: "summary", headerName: "Role" },
]

const PaymentsTable = ({ rows, proof, exclude = [] }) => {
  const handleClick = ({
    field,
    row: { programme, purpose, beneficiary_name },
  }) => {
    switch (field) {
      case "programme":
        navigate(`/programme/${slugify(programme)}`)
        break
      case "purpose":
        navigate(`/project/${slugify(purpose)}`)
        break
      default:
        exclude.indexOf("beneficiary_name") < 0 &&
          navigate(`/beneficiary/${slugify(beneficiary_name)}`)
    }
  }
  return (
    <>
      <DataDownload {...proof} />
      <DataGrid
        rows={rows}
        columns={columns.filter(({ field }) => exclude.indexOf(field) < 0)}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        autoHeight
        disableSelectionOnClick
        hideFooter={rows.length < 11}
        onCellClick={handleClick}
      />
    </>
  )
}

export default PaymentsTable
