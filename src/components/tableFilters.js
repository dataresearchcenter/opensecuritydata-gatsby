import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import ClearIcon from "@material-ui/icons/Clear"
import Button from "@material-ui/core/Button"
import Flag from "./flag"
import CountryNames from "../data/countryNames.json"
import SCHEMA from "../schema"

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  resetBtn: {
    height: 56,
  },
  control: {
    width: ({ isMobile }) => (isMobile ? "100%" : "auto"),
    minWidth: ({ isMobile }) => (isMobile ? null : 250),
  },
}))

const Filter = ({ label, items, value, applyFilter }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const classes = useStyles({ isMobile })
  value = items.find(i => i.value === value) ? value : ""

  return (
    <FormControl className={classes.control} variant="outlined">
      <InputLabel id={`label-${label}`}>Filter: {label}</InputLabel>
      <Select
        autoWidth
        labelId={`label-${label}`}
        id={`select-${label}`}
        label={label}
        value={value}
        onChange={({ target: { value } }) => applyFilter(value)}
      >
        <MenuItem value="">
          <em>all</em>
        </MenuItem>
        {items.map(({ label, value, disabled }) => (
          <MenuItem key={value} value={value} disabled={disabled}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const TableFilters = ({
  facets,
  availableFacets,
  applyFilter,
  activeFilters,
  resetFilters,
}) => {
  facets = facets
    .filter(({ items }) => items.length > 1)
    .map(f => {
      let items = f.items
        .filter(i => !!i)
        .sort()
        .map(i => ({
          label: i.toUpperCase(),
          value: i,
          disabled: availableFacets[f.field]?.indexOf(i) < 0,
        }))
      if (f.field === "country") {
        items = items.map(i => ({
          ...i,
          label: (
            <>
              <Flag iso={i.value} />
              {CountryNames[i.value]}
            </>
          ),
        }))
      } else if (f.field === "legalForm") {
        items = items.map(i => ({ ...i, label: SCHEMA[i.value].label }))
      }
      return { ...f, items }
    })
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {facets.map(({ field, headerName, items }) => (
        <Filter
          key={field}
          label={headerName}
          items={items}
          value={activeFilters[field] || ""}
          applyFilter={value => applyFilter({ field, value })}
        />
      ))}
      {Object.keys(activeFilters).length > 0 && (
        <Button
          className={classes.resetBtn}
          startIcon={<ClearIcon />}
          onClick={resetFilters}
        >
          Reset filters
        </Button>
      )}
    </div>
  )
}

export default TableFilters
