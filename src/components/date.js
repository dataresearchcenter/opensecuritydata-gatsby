const DateDisplay = ({ date, yearOnly }) =>
  new Date(date).toISOString().slice(0, yearOnly ? 4 : 10)

export default DateDisplay
