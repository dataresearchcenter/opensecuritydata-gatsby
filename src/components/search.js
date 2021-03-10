import React, { useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
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
import { Link } from "gatsby-theme-material-ui"
import { ListItemLink } from "./util"
import { updateLocationParams, getLocationParam } from "../util"
import SCHEMA from "../schema"

const LocalSearchData = () => {
  const { search } = useStaticQuery(graphql`
    query localSearchData {
      search: localSearchData {
        index
        store
      }
    }
  `)
  return search
}

const getLink = ({ id, name, schema, key }) =>
  SCHEMA[schema].getLink({ name, key, iso: key })

const useStyles = makeStyles(theme => ({
  root: {
    position: ({ asPopover }) => (asPopover ? "absolute" : "relative"),
    backgroundColor: "white",
  },
  searchResults: {
    position: "absolute",
  },
  linkItem: {
    textTransform: null,
  },
  searchHint: {
    padding: theme.spacing(1),
  },
  resultList: ({ asPopover }) =>
    asPopover
      ? {
          maxHeight: "80vh",
          overflowY: "scroll",
        }
      : null,
  advancedHint: {
    padding: theme.spacing(1),
  },
}))

const TextItem = ({ name, schema, asPopover }) =>
  asPopover ? (
    <ListItemText primary={name} secondary={SCHEMA[schema].label} />
  ) : (
    <ListItemText>
      {SCHEMA[schema].chip()} {name}
    </ListItemText>
  )

const ResultList = ({ items, cursor, asPopover, query }) => {
  const classes = useStyles({ asPopover })
  return (
    <Paper>
      <Typography
        variant="caption"
        color={asPopover ? "textSecondary" : "inherit"}
        className={classes.advancedHint}
        component="p"
      >
        Not what you are looking for? Try the{" "}
        <Link to={`/search?q=${query}`} color="secondary">
          advanced search
        </Link>
      </Typography>
      <List dense className={classes.resultList}>
        {items.map(({ id, name, schema, key }, i) => (
          <ListItemLink
            divider
            key={id}
            to={getLink({ name, schema, key })}
            autoFocus={i === cursor}
          >
            <TextItem name={name} schema={schema} asPopover={asPopover} />
          </ListItemLink>
        ))}
      </List>
    </Paper>
  )
}

const SearchResults = ({ query, searchInputRef, cursor, asPopover }) => {
  const { index, store } = LocalSearchData()
  const [showAll, setShowAll] = useState(false)
  const focus = () => searchInputRef?.current.focus()
  const refineSearch = () => {
    setShowAll(false)
    focus()
  }
  const classes = useStyles({ asPopover })
  const isMain = !asPopover
  const limit = isMain ? 100 : 20
  const results = useFlexSearch(query, index, store, { limit })
  const refineMsg =
    "Please refine your search phrase to get more precise results."

  return results.length > 0 ? (
    <div className={classes.root}>
      {isMain && (
        <Paper className={classes.searchHint}>
          <Typography variant="caption">
            You can use your arrow keys to navigate between results. Press your
            enter key to go to an item.
          </Typography>
        </Paper>
      )}
      <ResultList
        className={classes.searchResults}
        items={showAll ? results : results.slice(0, 10)}
        cursor={cursor}
        asPopover={asPopover}
        query={query}
      />
      {!showAll && results.length > 10 && (
        <Button endIcon={<ExpandMoreIcon />} onClick={() => setShowAll(true)}>
          Show more...
        </Button>
      )}
      {showAll && results.length === limit && (
        <Paper className={classes.searchHint}>
          <Typography>
            Your search for <strong>{query}</strong> has {limit} or more
            results.
            {isMain ? (
              <Button color="secondary" component="a" onClick={refineSearch}>
                {refineMsg}
              </Button>
            ) : (
              <em> {refineMsg}</em>
            )}
          </Typography>
        </Paper>
      )}
    </div>
  ) : (
    <div className={classes.root}>
      <Paper className={classes.searchHint}>
        <Typography>
          Your search for <strong>{query}</strong> has no results. Please try
          another search phrase or try to use the{" "}
          <Link to={`/search?q=${query}`} color="secondary">
            advanced search
          </Link>
        </Typography>
      </Paper>
    </div>
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
        style={{ background: "white" }}
      />
      {!query || query?.length < 3 ? (
        <Link to={`/search`} color="textSecondary">
          advanced search
        </Link>
      ) : (
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
export { SearchResults, LocalSearchData }
