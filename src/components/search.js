import React, { useState, useRef } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
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

const ResultList = ({ items, cursor }) => {
  return (
    <Paper>
      <List dense>
        {items.map(({ id, name, schema, key }, i) => (
          <ListItemLink
            key={id}
            to={getLink({ name, schema, key })}
            autoFocus={i === cursor}
          >
            <ListItemText>
              {SCHEMA[schema].chip()} {name}
            </ListItemText>
          </ListItemLink>
        ))}
      </List>
    </Paper>
  )
}

const SearchResults = ({ index, store, query, searchInputRef, cursor }) => {
  const [showAll, setShowAll] = useState(false)
  const refineSearch = () => setShowAll(false) && searchInputRef.current.focus()
  const classes = useStyles()
  const results = useFlexSearch(query, index, store, { limit: 100 })
  return (
    results.length > 0 && (
      <>
        <Paper>
          <Typography variant="caption">
            You can use your arrow keys to navigate between results. Press your
            enter key to go to an item.
          </Typography>
        </Paper>
        <ResultList
          className={classes.searchResults}
          items={showAll ? results : results.slice(0, 10)}
          cursor={cursor}
        />
        {!showAll && results.length > 10 && (
          <Button endIcon={<ExpandMoreIcon />} onClick={() => setShowAll(true)}>
            Show more...
          </Button>
        )}
        {showAll && results.length === 100 && (
          <Paper>
            <Typography paragraph={true}>
              Your search for <strong>{query}</strong> has 100 or more results.
              <Button color="secondary" component="a" onClick={refineSearch}>
                Please refine your search phrase to get more precise results.
              </Button>
            </Typography>
          </Paper>
        )}
      </>
    )
  )
}

const Search = ({ index, store }) => {
  const [query, setQuery] = useState(getLocationParam("q"))
  const [cursor, setCursor] = useState(-1)
  const handleChange = ({ target }) => setQuery(target.value)
  query?.length > 3 && updateLocationParams({ q: query })

  const searchInput = useRef()

  const handleKeyDown = e => {
    if (e.keyCode === 40) {
      e.preventDefault()
      cursor < 0 // initial
        ? setCursor(0)
        : // : setCursor(Math.min(cursor + 1, items.length - 1))
          setCursor(cursor + 1)
    }
    if (e.keyCode === 38) {
      e.preventDefault()
      if (cursor === 0) {
        // focus search input
        // FIXME
        setCursor(-1)
        searchInput.current.focus()
      } else {
        setCursor(Math.max(cursor - 1, 0))
      }
    }
  }

  return (
    <div onKeyDown={handleKeyDown} role="search">
      <TextField
        autoFocus
        id="q"
        ref={searchInput}
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
        style={{background: "white"}}
      />
      {query?.length > 3 && (
        <SearchResults
          query={query}
          searchInputRef={searchInput}
          cursor={cursor}
          setCursor={setCursor}
          index={index}
          store={store}
        />
      )}
    </div>
  )
}

export default Search
