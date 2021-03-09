import React, { useState, useEffect } from "react"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const YEARS = [
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021,
  2022,
]

const START = Math.min(...YEARS)
const END = Math.max(...YEARS)

const YearSelect = ({ availableYears, selectedYear, handleChange, label }) => (
  <FormControl>
    <InputLabel id={`id-${label}-label`}>{label}</InputLabel>
    <Select
      labelId={`id-${label}-label`}
      id={`id-${label}`}
      value={selectedYear}
      onChange={({ target }) => handleChange(target.value)}
    >
      {YEARS.map(year => (
        <MenuItem
          key={year}
          value={year}
          disabled={availableYears.indexOf(year) < 0}
        >
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const YearRangeSelector = ({ onChange, startYear = START, endYear = END }) => {
  const [start, setStart] = useState(startYear)
  const [end, setEnd] = useState(endYear)
  const active = start > START || end < END
  const reset = () => {
    setStart(START)
    setEnd(END)
  }

  useEffect(() => onChange([start, end]), [start, end])

  return (
    <>
      <YearSelect
        availableYears={YEARS.slice(0, YEARS.indexOf(end))}
        selectedYear={start}
        handleChange={setStart}
        label="From"
      />
      <YearSelect
        availableYears={YEARS.slice(YEARS.indexOf(start))}
        selectedYear={end}
        handleChange={setEnd}
        label="Until"
      />
      <IconButton
        color={active ? "primary" : "default"}
        disabled={!active}
        aria-label="reset"
        onClick={reset}
      >
        <CloseIcon />
      </IconButton>
    </>
  )
}

export default YearRangeSelector
export { START, END }
