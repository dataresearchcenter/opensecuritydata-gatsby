import React, { useState } from "react"
import { graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import Layout from "../components/layout"
import PaymentsTable from "../components/paymentsTable"
import { updateLocationParams, getLocationParam } from "../util"

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

const SearchPage = ({
  data: {
    search: { index, store },
    payments,
  },
}) => {
  const [query, setQuery] = useState(getLocationParam("q"))
  const handleChange = ({ target }) => setQuery(target.value)
  query?.length && updateLocationParams({ q: query })

  const projects = useFlexSearch(query, index, store)
    .filter(({ schema }) => schema === "p")
    .map(p => p.name)
  const filteredRows = payments.nodes.filter(
    ({ purpose }) => projects.indexOf(purpose) > -1
  )
  const rows = filteredRows.length ? filteredRows : payments.nodes
  console.log(rows)

  return (
    <Layout hideSearchBar route="Search">
      <Typography variant="h3">Advanced search</Typography>
      <TextField
        autoFocus
        id="q"
        placeholder="Search..."
        value={query || ""}
        onChange={handleChange}
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
        style={{ background: "white" }}
      />

      <PaymentsTable rows={rows} />
    </Layout>
  )
}

export default SearchPage
