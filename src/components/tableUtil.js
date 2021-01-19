import React, { useState, useRef } from "react"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import { DataGrid } from "@material-ui/data-grid"
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
    case "beneficiary_name":
      navigate(links.getBeneficiaryLink({ name: row.beneficiary_name }))
      break
    default:
      getLink
        ? navigate(getLink(row))
        : row.beneficiary_name &&
          navigate(links.getBeneficiaryLink({ name: row.beneficiary_name }))
  }
}

export function numericSort(value1, value2) {
  return (
    (parseFloat(value1.replace(",", "")) || 0) -
    (parseFloat(value2.replace(",", "")) || 0)
  )
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
  ...props
}) => {
  const classes = useStyles({ color })
  const ref = useRef()
  const [minHeight, setHeight] = useState()
  const adjustHeight = () => setTimeout(() => setHeight(ref.current?.clientHeight), 100) // FIXME DataGrid height
  adjustHeight()  // initial height

  filters = columns.filter(({ field }) => filters.indexOf(field) > -1)
  const getFacets = ({ filters, rows }) =>
    filters.map(f => ({
      ...f,
      items: [...new Set(rows.map(r => r[f.field]))],
    }))
  const facets = getFacets({ filters, rows })
  const initialState = {
    filteredRows: rows,
    activeFilters: {},
    availableFacets: facets,
  }
  const filterRows = activeFilters => {
    let filteredRows = rows
    for (const [field, value] of Object.entries(activeFilters)) {
      filteredRows = filteredRows.filter(r => r[field] === value)
    }
    return filteredRows
  }
  const [state, setState] = useState(initialState)
  const resetFilters = () => setState(initialState)
  const applyFilter = ({ field, value }) => {
    let activeFilters = {}
    if (value === "") {
      const keys = Object.keys(state.activeFilters).filter(k => k !== field)
      activeFilters = keys.reduce(
        (o, k) => ({ ...o, [k]: state.activeFilters[k] }),
        {}
      )
    } else {
      activeFilters = { ...state.activeFilters, [field]: value }
    }
    const filteredRows = filterRows(activeFilters)
    const availableFacets = getFacets({ filters, rows: filteredRows })
    setState({ activeFilters, filteredRows, availableFacets })
  }

  const { filteredRows, activeFilters, availableFacets } = state

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
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50, 100]}
          autoHeight
          disableSelectionOnClick
          hideFooter={rows.length < 11}
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
