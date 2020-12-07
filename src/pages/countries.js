import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CountriesTable from "../components/countryTable"

export const query = graphql`
  query CountriesQuery {
    countries: allCountriesJson {
      nodes {
        id
        iso
        name
        beneficiaries
        projects
        total_amount
      }
    }
  }
`

const CountriesPage = ({ data: { countries } }) => (
  <Layout route="Countries">
    <h1>All countries</h1>
    <CountriesTable rows={countries.nodes} />
  </Layout>
)

export default CountriesPage
