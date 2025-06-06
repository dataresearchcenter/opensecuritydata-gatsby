import React, { useState, useRef, useEffect } from "react"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import Tooltip from "@material-ui/core/Tooltip"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import { DataGrid } from "@material-ui/data-grid"
import { getLocationParam, updateLocationParams, filterByScope } from "../util"
import SCHEMA from "../schema"
import links from "../links"
import Amount from "./amount"
import Date from "./date"
import Country from "./country"
import TableFilters from "./tableFilters"
import TableDownload from "./tableDownload"
import ScopeSwitcher from "./scopeSwitcher"

export function renderCell({ field, value, row }, linkColor = "primary") {
  if (!value) return value
  if (field === "country") return <Country data={value} color={linkColor} />
  if (field === "legalForm") return SCHEMA[value].chip({ variant: "outlined" })
  if (field.indexOf("amount") > -1) return <Amount value={value} {...row} />
  if (
    field.indexOf("date") > -1 ||
    field.indexOf("activity") > -1 ||
    field.indexOf("start") > -1 ||
    field.indexOf("end") > -1
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

export function onCellClick(data, beneficiaryField, onRowClick) {
  const { field, row } = data
  switch (field) {
    case "program":
      navigate(links.getProgramLink({ name: row.program }))
      break
    case "project":
      navigate(links.getProjectLink({ name: row.project }))
      break
    case "country":
      navigate(links.getCountryLink({ iso: row.country }))
      break
    case beneficiaryField:
      if (!!row.legalForm) {
        navigate(SCHEMA[row.legalForm].getLink({ name: row[beneficiaryField] }))
      } else {
        navigate(links.getBeneficiaryLink({ name: row[beneficiaryField] }))
      }
      break
    default:
      if (!!onRowClick) {
        onRowClick && onRowClick(data)
      } else if (!!row.legalForm) {
        navigate(SCHEMA[row.legalForm].getLink({ name: row[beneficiaryField] }))
      } else {
        navigate(links.getBeneficiaryLink({ name: row[beneficiaryField] }))
      }
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
  scopeSwitcher = false,
  pageSize = 25,
  beneficiaryField = "beneficiaryName",
  onRowClick,
  ...props
}) => {
  const classes = useStyles({ color })
  const ref = useRef()
  const [minHeight, setHeight] = useState()
  const adjustHeight = () =>
    setTimeout(() => setHeight(ref.current?.clientHeight), 100) // FIXME DataGrid height
  adjustHeight() // initial height
  const handlePageChange = ({ page }) => {
    updateLocationParams({ p: page })
    adjustHeight()
  }
  const handlePageSizeChange = ({ pageSize }) => {
    updateLocationParams({ limit: pageSize })
  }
  const initialPage = parseInt(getLocationParam("p")) || 1
  const initialPageSize = parseInt(getLocationParam("limit")) || pageSize

  filters = columns.filter(({ field }) => filters.indexOf(field) > -1)
  const getFacets = ({ filters, rows }) =>
    filters.map(f => ({
      ...f,
      items: [...new Set(rows.map(r => r[f.field]))],
    }))

  const facets = getFacets({ filters, rows })

  const filterRows = filters => {
    let filteredRows = rows
    for (const [field, value] of Object.entries(filters)) {
      filteredRows = filteredRows.filter(r => r[field] === value)
    }
    return filteredRows
  }

  const activeFiltersFromURL = {}
  for (const { field } of facets) {
    const value = getLocationParam(field)
    if (value) {
      activeFiltersFromURL[field] = value
    }
  }

  const [activeRows, setActiveRows] = useState(rows)
  const [activeFilters, setActiveFilters] = useState(activeFiltersFromURL)
  const [availableFacets, setAvailableFacets] = useState(facets)
  const resetFilters = () => {
    setActiveRows(rows)
    setAvailableFacets(facets)
    setActiveFilters({})
    facets.map(({ field }) => updateLocationParams({ [field]: null }))
  }

  const applyFilter = ({ field, value }) => {
    let newActiveFilters = {}
    if (value === "") {
      updateLocationParams({ [field]: null })
      const keys = Object.keys(activeFilters).filter(k => k !== field)
      newActiveFilters = keys.reduce(
        (o, k) => ({ ...o, [k]: activeFilters[k] }),
        {}
      )
    } else {
      newActiveFilters = { ...activeFilters, [field]: value }
    }
    const filteredRows = filterRows(newActiveFilters)
    const availableFacets = getFacets({ filters, rows: filteredRows })
    updateLocationParams(newActiveFilters)
    setActiveRows(filteredRows)
    setActiveFilters(newActiveFilters)
    setAvailableFacets(availableFacets)
  }

  const applyFilters = filters => {
    for (const [field, value] of Object.entries(filters)) {
      applyFilter({ field, value })
    }
  }
  useEffect(() => applyFilters(activeFilters), [])

  // rows changing from "outside"
  useEffect(() => {
    setActiveRows(rows)
    applyFilters(activeFilters)
  }, [rows])

  // switch scope military / non-military
  const [scope, setScope] = useState(null)
  const handleScopeChange = scope => {
    if (scope === "all") {
      setScope(null)
    } else {
      setScope(scope)
    }
  }
  useEffect(() => {
    const newRows = filterByScope(rows, scope)
    setActiveRows(newRows)
  }, [scope])

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
      {rows.length > 1 && !!scopeSwitcher && (
        <ScopeSwitcher scope={scope} onChange={handleScopeChange} />
      )}
      <Grid container justify="flex-end">
        {activeRows.length > 0 && (
          <TableDownload rows={activeRows} filters={activeFilters} />
        )}
      </Grid>
      <Paper style={{ minHeight }}>
        <DataGrid
          ref={ref}
          rows={activeRows}
          columns={columns}
          page={initialPage}
          pageSize={initialPageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
          autoHeight
          disableSelectionOnClick
          hideFooter={activeRows.length < initialPageSize + 1}
          onCellClick={data => onCellClick(data, beneficiaryField, onRowClick)}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          sortingOrder={["desc", "asc", null]}
          {...props}
        />
      </Paper>
    </div>
  )
}

export default DataTable
