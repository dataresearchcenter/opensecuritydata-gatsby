import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { SimpleList } from "../components/util"

export const query = graphql`
  query CountriesQuery {
    countries: allCountriesJson {
      nodes {
        iso
        name
      }
    }
  }
`

const CountriesPage = ({ data: { countries } }) => (
  <Layout>
    <h1>All countries</h1>
    <SimpleList
      dense
      items={countries.nodes}
      getLink={({ iso }) => `/country/${iso}`}
    />
  </Layout>
)

export default CountriesPage
