import numeral from "numeral"

const format = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR",
})

const Amount = ({ value, abbrev = false }) =>
  abbrev ? `€${numeral(value).format("0.00a")}` : format.format(value)

export default Amount
