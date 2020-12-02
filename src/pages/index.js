import React from "react"
import { graphql } from "gatsby"
import slugify from "slugify"
import Box from "@material-ui/core/Box"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Grid from "@material-ui/core/Grid"
import { Button, Link } from "gatsby-theme-material-ui"
import Layout from "../components/layout"
import Search from "../components/search"
import { SimpleList } from "../components/util"

export const query = graphql`
  query IndexQuery {
    beneficiaries: allBeneficiariesJson(limit: 10) {
      nodes {
        name
      }
    }
    countries: allCountriesJson(limit: 10) {
      nodes {
        iso
        name
      }
    }
  }
`

const IndexPage = ({ data: { beneficiaries, countries } }) => (
  <Layout>
    <Box my={4}>
      <Search />
    </Box>
    <Grid container justify="center" spacing={5}>
      <Grid item>
        <h2>Companies &amp; Institutions</h2>
        <SimpleList
          dense
          items={beneficiaries.nodes}
          getLink={({ name }) => `/beneficiary/${slugify(name)}`}
        />
        <Link to="/beneficiaries">See all</Link>
      </Grid>
      <Grid item>
        <h2>Topics</h2>
      </Grid>
      <Grid item>
        <h2>Countries</h2>
        <SimpleList
          dense
          items={countries.nodes}
          getLink={({ iso }) => `/country/${iso}`}
        />
        <Link to="/countries">See all</Link>
      </Grid>
    </Grid>
    <ButtonGroup variant="text">
      <Button to="/programmes">All funding programmes</Button>
      <Button to="/projects">All projects</Button>
      <Button to="/beneficiaries">All beneficiaries</Button>
      <Button to="/countries">All countries</Button>
    </ButtonGroup>
  </Layout>
)

export default IndexPage
