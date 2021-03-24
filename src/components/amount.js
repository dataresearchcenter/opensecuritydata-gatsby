import React from "react"
import numeral from "numeral"
import Tooltip from "@material-ui/core/Tooltip"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const format = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR",
})

const Amount = ({ value, abbrev = false, amountOrig, currency }) => {
  const renderedValue = abbrev ? `€${numeral(value).format("0.00a")}` : format.format(value)
  if (!!currency && currency !== "EUR") {
    return (
      <Tooltip title={`${currency} ${numeral(amountOrig).format("0,0.00")}`}>
        <span>
          {renderedValue} <InfoOutlinedIcon fontSize="small" color="action" />
        </span>
      </Tooltip>
    )
  } else {
    return renderedValue
  }
}

export default Amount
