import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableRow from "@material-ui/core/TableRow"

const AttributeTable = ({ data, ...rest }) => (
  <TableContainer {...rest}>
    <Table aria-label="simple table">
      <TableBody>
        {Object.keys(data).map(k => (
          <TableRow key={k}>
            <TableCell component="th" scope="row">
              {k.replace("_", " ").replace(/^\w/, k[0].toUpperCase())}
            </TableCell>
            <TableCell align="right">{data[k]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default AttributeTable
