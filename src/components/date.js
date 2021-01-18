const DateDisplay = ({ date, yearOnly, format }) =>
  format === "long"
    ? new Date(date).toDateString()
    : new Date(date).toISOString().slice(0, yearOnly ? 4 : 10)

export default DateDisplay
