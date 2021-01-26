import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
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
        amount
      }
    }
  }
`

const CountriesPage = ({ data: { countries } }) => (
  <Layout route="Countries">
    <Typography variant="h3" gutterBottom>
      All countries
    </Typography>
    <CountriesTable rows={countries.nodes} pageSize={25} />
  </Layout>
)

export default CountriesPage
