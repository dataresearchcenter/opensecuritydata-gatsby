import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import slugify from "slugify"
import { useFlexSearch } from "react-use-flexsearch"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import { ListItemLink } from "./util"
import { updateLocationParams, getLocationParam } from "../util"

const PATHS = {
  1: "beneficiary",
  2: "project",
  3: "programme",
  4: "country",
}

const SCHEMATA = {
  c: "Company",
  l: "LegalEntity",
  o: "Organization",
  p: "PublicBody",
  j: "Project",
  r: "Funding programme",
  n: "Country",
}

const ResultList = ({ items }) => (
  <List>
    {items.map(({ id, name, schema }) => (
      <ListItemLink
        key={id}
        to={`/${PATHS[id.toString()[0]]}/${slugify(name)}`}
      >
        <ListItemText>
          {name} ({SCHEMATA[schema]})
        </ListItemText>
      </ListItemLink>
    ))}
  </List>
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

  return (
    <>
      <h1>Search</h1>
      <TextField
        id="q"
        label="Search..."
        value={query || ""}
        onChange={handleChange}
        autoComplete="off"
      />
      {query?.length > 3 && <SearchResults query={query} />}
    </>
  )
}

export default Search
