const format = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR",
})

const Amount = ({ value }) => format.format(value)

export default Amount
