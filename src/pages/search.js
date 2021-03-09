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
    search: localSearchData {
      index
      store
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

  return (
    <Paper component="form" className={classes.root}>
      <TextField
        autoFocus
        id="q"
        placeholder="Search..."
        value={value || ""}
        onChange={({ target }) => (
          setValue(target.value), handleChange(target.value)
        )}
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
        onClick={() => (setValue(""), handleChange(""))}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  )
}

const SearchPage = ({
  data: {
    search: { index, store },
    payments,
  },
}) => {
  const theme = useTheme()
  const [query, setQuery] = useState(getLocationParam("q"))

  let timeout = null
  const handleChange = q => {
    clearTimeout(timeout)
    timeout = setTimeout(() => (setQuery(q), updateLocationParams({ q })), 200)
  }

  const results = useFlexSearch(query, index, store)
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
  const rows = filteredRows.length > 0 ? filteredRows : payments.nodes

  return (
    <Layout hideSearchBar route="Search">
      <Typography variant="h3" gutterBottom>
        Advanced search
      </Typography>
      <SearchField query={query} handleChange={handleChange} />
      {query && filteredRows.length === 0 && (
        <Typography component="p">
          Your search for <strong>{query}</strong> has now results. Displaying
          all {rows.length} entries in the table below.
        </Typography>
      )}
      {query && filteredRows.length > 0 && (
        <Typography variant="h4" gutterBottom>
          {filteredRows.length} results for{" "}
          <span style={{ color: theme.palette.primary.light }}>{query}</span>
        </Typography>
      )}

      <PaymentsTable rows={rows} pageSize={25} />
    </Layout>
  )
}

export default SearchPage
