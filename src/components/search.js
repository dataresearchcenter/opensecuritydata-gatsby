import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import slugify from "slugify"
import { useFlexSearch } from "react-use-flexsearch"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import { ListItemLink } from "./util"
import { updateLocationParams, getLocationParam, pathSlugify } from "../util"

const PATHS = {
  1: "beneficiaries",
  2: "projects",
  3: "programmes",
  4: "countries",
  5: "topics",
}

const SCHEMATA = {
  c: "Company",
  l: "LegalEntity",
  o: "Organization",
  p: "PublicBody",
  j: "Project",
  r: "Funding programme",
  n: "Country",
  t: "Topic",
}

const getLink = ({ id, name, schema, path }) =>
  `/${PATHS[id.toString()[0]]}/${
    schema === "t" ? pathSlugify(path) : slugify(name)
  }`

const useStyles = makeStyles(theme => ({
  searchResults: {
    position: "absolute",
  },
}))

const ResultList = ({ items }) => (
  <Paper>
    <List dense>
      {items.map(({ id, name, schema, path }) => (
        <ListItemLink key={id} to={getLink({ id, name, schema, path })}>
          <ListItemText>
            {name} ({SCHEMATA[schema]})
          </ListItemText>
        </ListItemLink>
      ))}
    </List>
  </Paper>
)

const SearchResults = ({ query }) => {
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
  return results.length > 0 && <ResultList items={results} />
}

const Search = () => {
  const [query, setQuery] = useState(getLocationParam("q"))
  const handleChange = ({ target }) => setQuery(target.value)
  query?.length > 3 && updateLocationParams({ q: query })
  const classes = useStyles()

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
      {query?.length > 3 && (
        <SearchResults className={classes.searchResults} query={query} />
      )}
    </>
  )
}

export default Search
