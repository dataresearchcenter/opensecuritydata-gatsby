import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import { ListItemLink } from "./util"
import { updateLocationParams, getLocationParam } from "../util"
import SCHEMA from "../schema"

const getLink = ({ id, name, schema, key }) =>
  SCHEMA[schema].getLink({ name, key, iso: key })

const useStyles = makeStyles(theme => ({
  searchResults: {
    position: "absolute",
  },
  linkItem: {
    textTransform: null,
  },
}))

const ResultList = ({ items }) => (
  <Paper>
    <List dense>
      {items.map(({ id, name, schema, key }) => (
        <ListItemLink key={id} to={getLink({ name, schema, key })}>
          <ListItemText>
            {SCHEMA[schema].chip()} {name}
          </ListItemText>
        </ListItemLink>
      ))}
    </List>
  </Paper>
)

const SearchResults = ({ query }) => {
  const classes = useStyles()
  const { search } = useStaticQuery(graphql`
    query localSearchQuery {
      search: localSearchData {
        index
        store
      }
    }
  `)
  const { index, store } = search
  const results = useFlexSearch(query, index, store, { limit: 10 })
  return (
    results.length > 0 && (
      <ResultList className={classes.searchResults} items={results} />
    )
  )
}

const Search = () => {
  const [query, setQuery] = useState(getLocationParam("q"))
  const handleChange = ({ target }) => setQuery(target.value)
  query?.length > 3 && updateLocationParams({ q: query })

  return (
    <>
      <TextField
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
      />
      {query?.length > 3 && <SearchResults query={query} />}
    </>
  )
}

export default Search
