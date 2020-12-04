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
import { pathSlugify } from "../util"

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
    topics: allTopicsJson(limit: 10) {
      nodes {
        key
        name
      }
    }
  }
`

const IndexPage = ({ data: { beneficiaries, countries, topics } }) => (
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
          getLink={({ name }) => `/beneficiaries/${slugify(name)}`}
        />
        <Link to="/beneficiaries">See all</Link>
      </Grid>
      <Grid item>
        <h2>Topics</h2>
        <SimpleList
          dense
          items={topics.nodes}
          getLink={({ key }) => `/topics/${pathSlugify(key)}`}
        />
        <Link to="/topics">See all</Link>
      </Grid>
      <Grid item>
        <h2>Countries</h2>
        <SimpleList
          dense
          items={countries.nodes}
          getLink={({ iso }) => `/countries/${iso}`}
        />
        <Link to="/countries">See all</Link>
      </Grid>
    </Grid>
    <ButtonGroup variant="text">
      <Button to="/programmes">All funding programmes</Button>
      <Button to="/projects">All projects</Button>
      <Button to="/beneficiaries">All beneficiaries</Button>
      <Button to="/countries">All countries</Button>
      <Button to="/topics">All topics</Button>
    </ButtonGroup>
  </Layout>
)

export default IndexPage
