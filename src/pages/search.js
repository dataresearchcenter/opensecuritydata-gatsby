import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import LinearProgress from "@material-ui/core/LinearProgress"
import Layout from "../components/layout"
import ParticipationsTable from "../components/participationsTable"
import YearRangeSelector, { START, END } from "../components/yearRangeSelector"
import SearchStore from "../searchStore"
import { SearchField } from "../components/search"
import { EntitySchemaKeys } from "../schema"
import { getLocationParam, updateLocationParams } from "../util"

export const query = graphql`
  query {
    participations: allParticipationsJson {
      nodes {
        ...ParticipationFragment
      }
    }
  }
`

const SearchableTable = ({
  participations,
  query,
  years: [start, end],
  searchData: { index, store },
}) => {
  const theme = useTheme()
  const color = theme.palette.primary.light
  const results = useFlexSearch(query, index, store)
  const projects = results
    .filter(({ schema }) => schema === "p")
    .map(p => p.name)
  const entities = results
    .filter(({ schema }) => EntitySchemaKeys.indexOf(schema) > -1)
    .map(p => p.name)
  const filteredRows = participations.filter(
    ({ project, beneficiaryName }) =>
      projects.indexOf(project) > -1 || entities.indexOf(beneficiaryName) > -1
  )

  const rows = (filteredRows.length > 0 ? filteredRows : participations)
    .filter(({ startDate }) => parseInt(startDate?.slice(0, 4)) >= start)
    .filter(({ endDate }) => parseInt(endDate?.slice(0, 4)) <= end)

  return (
    <>
      {query &&
        (filteredRows.length > 0 ? (
          <Typography variant="h4" gutterBottom>
            {rows.length} results for <span style={{ color }}>{query}</span>{" "}
            from {start} to {end}
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom>
            All {rows.length} items from {start} to {end}
          </Typography>
        ))}
      {query && filteredRows.length === 0 && (
        <Typography component="p">
          Your search for <strong>{query}</strong> has no results. Displaying
          all {rows.length} entries in the table below.
        </Typography>
      )}

      <ParticipationsTable rows={rows} pageSize={25} />
    </>
  )
}

const SearchPage = ({ data: { participations } }) => {
  const theme = useTheme()
  const color = theme.palette.primary.light

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

  const initialQuery = getLocationParam("q")
  const [query, setQuery] = useState(initialQuery)
  const [years, setYears] = useState([
    parseInt(getLocationParam("startYear")) || START,
    parseInt(getLocationParam("endYear")) || END,
  ])
  const onChangeYears = ([startYear, endYear]) => {
    setYears([startYear, endYear])
    updateLocationParams({ startYear, endYear })
  }

  const [start, end] = years
  const yearSelectStyle = {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }

  return (
    <Layout hideSearchBar route="Search">
      <Typography variant="h3" gutterBottom>
        Advanced search
      </Typography>
      <SearchField
        query={initialQuery}
        handleChange={setQuery}
        withReset
      />
      <div style={yearSelectStyle}>
        {start === START && end === END ? (
          <Typography variant="h6">All years</Typography>
        ) : (
          <Typography variant="h6">
            Years:
            <span style={{ color }}> {start} </span>to
            <span style={{ color }}> {end}</span>
          </Typography>
        )}
        <YearRangeSelector
          startYear={start}
          endYear={end}
          onChange={onChangeYears}
        />
      </div>
      {searchData ? (
        <SearchableTable
          participations={participations.nodes}
          years={years}
          searchData={searchData}
          query={query}
        />
      ) : (
        <LinearProgress />
      )}
    </Layout>
  )
}

export default SearchPage
