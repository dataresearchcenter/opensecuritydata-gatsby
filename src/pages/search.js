import React, { useState } from "react"
import { graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import CloseIcon from "@material-ui/icons/Close"
import Layout from "../components/layout"
import PaymentsTable from "../components/paymentsTable"
import YearRangeSelector, { START, END } from "../components/yearRangeSelector"
import { LocalSearchData } from "../components/search"
import { EntitySchemaKeys } from "../schema"
import { getLocationParam, updateLocationParams } from "../util"

export const query = graphql`
  query {
    payments: allPaymentsJson {
      nodes {
        id
        programme
        purpose
        beneficiaryName
        notes
        amount
        startDate
        endDate
        legalForm
        country
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  // input: {
  //   flex: 1,
  // },
  iconButton: {
    padding: theme.spacing(1),
  },
}))

const SearchField = ({ query, handleChange }) => {
  const [value, setValue] = useState(query)
  const classes = useStyles()
  const active = !!value?.length
  const changeValue = v => {
    setValue(v)
    handleChange(v)
  }

  return (
    <Paper component="form" className={classes.root}>
      <TextField
        autoFocus
        id="q"
        placeholder="Search..."
        value={value || ""}
        onChange={({ target }) => changeValue(target.value)}
        autoComplete="off"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <IconButton
        color={active ? "primary" : "default"}
        disabled={!active}
        className={classes.iconButton}
        aria-label="reset"
        onClick={() => changeValue("")}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  )
}

const SearchPage = ({ data: { payments } }) => {
  const { index, store } = LocalSearchData()
  const theme = useTheme()
  const color = theme.palette.primary.light
  const [query, setQuery] = useState(getLocationParam("q"))
  const [years, setYears] = useState([
    parseInt(getLocationParam("startYear")) || START,
    parseInt(getLocationParam("endYear")) || END,
  ])
  const onChangeYears = ([startYear, endYear]) => {
    setYears([startYear, endYear])
    updateLocationParams({ startYear, endYear })
  }

  let timeout = null
  const handleChange = q => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setQuery(q)
      updateLocationParams({ q })
    }, 200)
  }

  const results = useFlexSearch(query, index, store)
  const [start, end] = years
  const projects = results
    .filter(({ schema }) => schema === "p")
    .map(p => p.name)
  const entities = results
    .filter(({ schema }) => EntitySchemaKeys.indexOf(schema) > -1)
    .map(p => p.name)
  const filteredRows = payments.nodes.filter(
    ({ purpose, beneficiaryName }) =>
      projects.indexOf(purpose) > -1 || entities.indexOf(beneficiaryName) > -1
  )

  const rows = (filteredRows.length > 0 ? filteredRows : payments.nodes)
    .filter(({ startDate }) => parseInt(startDate?.slice(0, 4)) >= start)
    .filter(({ endDate }) => parseInt(endDate?.slice(0, 4)) <= end)

  return (
    <Layout hideSearchBar route="Search">
      <Typography variant="h3" gutterBottom>
        Advanced search
      </Typography>
      <SearchField query={query} handleChange={handleChange} />
      <div style={{ paddingBottom: theme.spacing(4) }}>
        {start === START && end === END ? (
          <Typography variant="h6">All years</Typography>
        ) : (
          <Typography variant="h6">
            Years:
            <span style={{ color }}> {start} </span>to
            <span style={{ color }}> {end}</span>
          </Typography>
        )}
        <YearRangeSelector
          startYear={start}
          endYear={end}
          onChange={onChangeYears}
        />
      </div>
      {query &&
        (filteredRows.length > 0 ? (
          <Typography variant="h4" gutterBottom>
            {rows.length} results for <span style={{ color }}>{query}</span>{" "}
            from {start} to {end}
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom>
            All {rows.length} items from {start} to {end}
          </Typography>
        ))}
      {query && filteredRows.length === 0 && (
        <Typography component="p">
          Your search for <strong>{query}</strong> has no results. Displaying
          all {rows.length} entries in the table below.
        </Typography>
      )}

      <PaymentsTable rows={rows} pageSize={25} />
    </Layout>
  )
}

export default SearchPage
