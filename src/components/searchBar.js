import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { fade, makeStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import { SearchResults } from "./search"

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

const SearchBar = () => {
  const data = useStaticQuery(graphql`
    query localSearchStaticQuery {
      localSearchData {
        index
        store
      }
    }
  `)
  const { index, store } = data.localSearchData
  const classes = useStyles()
  const [query, setQuery] = useState()
  const [cursor, setCursor] = useState(-1)
  const handleChange = ({ target }) => setQuery(target.value)

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
      {query?.length > 3 && (
        <SearchResults
          query={query}
          cursor={cursor}
          setCursor={setCursor}
          index={index}
          store={store}
          asPopover
        />
      )}
    </div>
  )
}

export default SearchBar
