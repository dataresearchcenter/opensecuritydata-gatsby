import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import { Link } from "gatsby-theme-material-ui"
import Amount from "./amount"
import Date from "./date"
import { getCountryLink } from "../links"

const renderCell = (key, value, linkColor) => {
  if (
    key.indexOf("date") > -1 ||
    key.indexOf("activity") > -1 ||
    key.indexOf("start") > -1 ||
    key.indexOf("end") > -1
  ) {
    return <Date date={value} />
  }
  if (key.indexOf("amount") > -1) {
    return <Amount value={value} />
  }
  if (key.indexOf("country") > -1) {
    return (
      <Link to={getCountryLink(value)} color={linkColor}>
        {value.name}
      </Link>
    )
  }
  return value
}

const AttributeTable = ({ data, linkColor, ...rest }) => (
  <TableContainer {...rest}>
    <Table aria-label="simple table">
      <TableBody>
        {Object.keys(data).map(k => (
          <TableRow key={k}>
            <TableCell component="th" scope="row">
              {k.replace("_", " ").replace(/^\w/, k[0].toUpperCase())}
            </TableCell>
            <TableCell align="right">
              {renderCell(k, data[k], linkColor)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default AttributeTable
