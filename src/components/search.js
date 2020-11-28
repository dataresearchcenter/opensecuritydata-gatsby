import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import TextField from "@material-ui/core/TextField"
import BeneficiaryList from "../components/beneficiariesList"

const Search = () => {
  const data = useStaticQuery(graphql`
    query localSearchQuery {
      localSearchBeneficiaries {
        index
        store
      }
    }
  `)
  const [query, setQuery] = useState(null)
  const handleChange = ({ target }) => setQuery(target.value)
  const { index, store } = data.localSearchBeneficiaries
  const results = useFlexSearch(query, index, store)
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
      {results.length > 0 && <BeneficiaryList items={results} />}
    </>
  )
}

export default Search
