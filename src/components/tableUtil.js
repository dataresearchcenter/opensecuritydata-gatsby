import React, { useState, useRef, useEffect } from "react"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import Tooltip from "@material-ui/core/Tooltip"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { DataGrid } from "@material-ui/data-grid"
// import { getLocationParam, updateLocationParams } from "../util"
import SCHEMA from "../schema"
import links from "../links"
import Amount from "./amount"
import Date from "./date"
import Country from "./country"
import TableFilters from "./tableFilters"

export function renderCell(key, value, linkColor) {
  if (!value) return value
  if (key === "country") return <Country data={value} color={linkColor} />
  if (key === "legalForm") return SCHEMA[value].chip({ variant: "outlined" })
  if (key.indexOf("amount") > -1) return <Amount value={value} />
  if (
    key.indexOf("date") > -1 ||
    key.indexOf("activity") > -1 ||
    key.indexOf("start") > -1 ||
    key.indexOf("end") > -1
  )
    return <Date date={value} />
  if (value.toString().indexOf("http") === 0)
    return (
      <Link href={value} color={linkColor}>
        {value}
      </Link>
    )
  return value
}

export function renderBeneficiary({ value, row }) {
  return row.notes ? (
    <Tooltip title={row.notes}>
      <span>
        <em>{value}</em> <HelpOutlineIcon fontSize="small" color="action" />
      </span>
    </Tooltip>
  ) : (
    value
  )
}

export function onCellClick({ field, row }, getLink) {
  switch (field) {
    case "programme":
      navigate(links.getProgrammeLink({ name: row.programme }))
      break
    case "purpose":
      navigate(links.getProjectLink({ name: row.purpose }))
      break
    case "country":
      navigate(links.getCountryLink({ iso: row.country }))
      break
    case "beneficiaryName":
      navigate(links.getBeneficiaryLink({ name: row.beneficiaryName }))
      break
    default:
      getLink
        ? navigate(getLink(row))
        : row.beneficiaryName &&
          navigate(links.getBeneficiaryLink({ name: row.beneficiaryName }))
  }
}

export function numericSort(value1, value2) {
  return value1 - value2
}

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-row:hover": {
      cursor: "pointer",
    },
    "& .MuiDataGrid-footer": {
      backgroundColor: theme.palette.background.default,
    },
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: ({ color }) => theme.palette[color].light,
      color: "white",
      border: "none",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-sortIcon": {
      color: "white",
    },
    "& .data-container": {
      backgroundColor: "white",
    },
  },
}))

const DataTable = ({
  rows,
  columns,
  color = "primary",
  filters = [],
  pageSize = 10,
  ...props
}) => {
  const classes = useStyles({ color })
  const ref = useRef()
  const [minHeight, setHeight] = useState()
  const adjustHeight = () =>
    setTimeout(() => setHeight(ref.current?.clientHeight), 100) // FIXME DataGrid height
  adjustHeight() // initial height

  filters = columns.filter(({ field }) => filters.indexOf(field) > -1)
  const getFacets = ({ filters, rows }) =>
    filters.map(f => ({
      ...f,
      items: [...new Set(rows.map(r => r[f.field]))],
    }))

  const facets = getFacets({ filters, rows })

  const filterRows = activeFilters => {
    let filteredRows = rows
    for (const [field, value] of Object.entries(activeFilters)) {
      filteredRows = filteredRows.filter(r => r[field] === value)
    }
    return filteredRows
  }

  const [activeRows, setActiveRows] = useState(rows)
  const [activeFilters, setActiveFilters] = useState({})
  const [availableFacets, setAvailableFacets] = useState(facets)
  const resetFilters = () => {
    setActiveRows(rows)
    setAvailableFacets(facets)
    setActiveFilters({})
    // facets.map(({ field }) => updateLocationParams({ [field]: null }))
  }

  // rows changing from "outside"
  useEffect(() => {
    setActiveRows(rows)
  }, [rows])

  const applyFilter = ({ field, value }) => {
    let activeFilters = {}
    if (value === "") {
      const keys = Object.keys(activeFilters).filter(k => k !== field)
      activeFilters = keys.reduce(
        (o, k) => ({ ...o, [k]: activeFilters[k] }),
        {}
      )
    } else {
      activeFilters = { ...activeFilters, [field]: value }
    }
    const filteredRows = filterRows(activeFilters)
    const availableFacets = getFacets({ filters, rows: filteredRows })
    // updateLocationParams(activeFilters)
    setActiveRows(filteredRows)
    setActiveFilters(activeFilters)
    setAvailableFacets(availableFacets)
  }

  return (
    <div className={classes.root}>
      {rows.length > 1 && (
        <Typography color="textSecondary" variant="body2" gutterBottom>
          Sort this table by clicking on the column headers. Click on a cell to
          go to a page with more information on that item.
        </Typography>
      )}
      {rows.length > 1 && filters.length > 0 && (
        <TableFilters
          facets={facets}
          availableFacets={availableFacets.reduce(
            (o, f) => ({ ...o, [f.field]: f.items }),
            {}
          )}
          applyFilter={applyFilter}
          activeFilters={activeFilters}
          resetFilters={resetFilters}
        />
      )}
      <Paper style={{ minHeight }}>
        <DataGrid
          ref={ref}
          rows={activeRows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          autoHeight
          disableSelectionOnClick
          hideFooter={activeRows.length < 11}
          onCellClick={onCellClick}
          onPageChange={adjustHeight}
          sortingOrder={["desc", "asc", null]}
          {...props}
        />
      </Paper>
    </div>
  )
}

export default DataTable
