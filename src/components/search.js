import React, { useState, useEffect } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import CloseIcon from "@material-ui/icons/Close"
import ListItemText from "@material-ui/core/ListItemText"
import LinearProgress from "@material-ui/core/LinearProgress"
import { Link } from "gatsby-theme-material-ui"
import { ListItemLink } from "./util"
import { updateLocationParams, getLocationParam } from "../util"
import SCHEMA from "../schema"
import SearchStore from "../searchStore"

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
  searchField: {
    display: "flex",
    alignItems: "center",
  },
  searchFieldReset: {
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

const ActualSearchResults = ({
  query,
  searchData: { index, store },
  asPopover,
  cursor,
}) => {
  const [showAll, setShowAll] = useState(false)
  const refineSearch = () => {
    setShowAll(false)
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

const SearchResults = ({ ...props }) => {
  const [searchData, setSearchData] = useState()
  useEffect(() => {
    let mounted = true
    SearchStore.data().then(
      ([index, store]) => mounted && setSearchData({ index, store })
    )
    return function cleanup() {
      mounted = false
    }
  }, [])
  return searchData ? (
    <ActualSearchResults searchData={searchData} {...props} />
  ) : (
    <LinearProgress color="secondary" />
  )
}

const SearchField = ({
  query,
  handleChange,
  withReset,
  color = "primary",
  ...props
}) => {
  const classes = useStyles()
  const [value, setValue] = useState(query || "")
  const [typing, toggleTyping] = useState(false)
  const [timeout, updateTimeout] = useState()

  const changeValue = value => {
    clearTimeout(timeout)
    toggleTyping(true)
    setValue(value)
    updateTimeout(
      setTimeout(() => {
        handleChange(value)
        updateLocationParams({ q: value })
        toggleTyping(false)
      }, 300)
    )
  }

  const active = !!value?.length

  return (
    <>
      <Paper component="form" className={classes.searchField}>
        <TextField
          id="q"
          placeholder="Search..."
          value={value}
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
          style={{ background: "white" }}
          color={color}
          {...props}
        />
        {withReset && (
          <IconButton
            color={active ? color : "default"}
            disabled={!active}
            className={classes.searchFieldReset}
            aria-label="reset"
            onClick={() => changeValue("")}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
      {typing && <LinearProgress color={color} />}
    </>
  )
}

const Search = props => {
  const initialQuery = getLocationParam("q")
  const [query, setQuery] = useState(initialQuery)
  const [cursor, setCursor] = useState(-1)

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
        setCursor(-1)
      } else {
        setCursor(Math.max(cursor - 1, 0))
      }
    }
  }

  return (
    <div onKeyDown={handleKeyDown} role="search">
      <SearchField handleChange={setQuery} query={initialQuery} {...props} />
      {!query || query?.length < 3 ? (
        <Link to={`/search`} color="textSecondary">
          advanced search
        </Link>
      ) : (
        <SearchResults
          query={query}
          cursor={cursor}
          setCursor={setCursor}
          {...props}
        />
      )}
    </div>
  )
}

export default Search
export { SearchResults, SearchField }
