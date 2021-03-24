import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"
import { renderCell } from "./tableUtil"

const AttributeTable = ({ data, linkColor, ...rest }) => (
  <TableContainer {...rest}>
    <Table aria-label="simple table">
      <TableBody>
        {Object.keys(data)
          .filter(k => data[k] !== "")
          .map(k => (
            <TableRow key={k}>
              <TableCell component="th" scope="row" style={{ paddingLeft: 0 }}>
                {k.replace("_", " ").replace(/^\w/, k[0].toUpperCase())}
              </TableCell>
              <TableCell align="right" style={{ paddingRight: 0 }}>
                {renderCell({ field: k, value: data[k] }, linkColor)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default AttributeTable
