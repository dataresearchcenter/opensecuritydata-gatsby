import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Layout from "../components/layout"
import Search from "../components/search"
import SimpleBrowser from "../components/simpleBrowser"

export const query = graphql`
  query localSearchQuery {
    search: localSearchData {
      index
      store
    }
  }
`

const useStyles = makeStyles(theme => ({
  hero: {
    textAlign: "center",
    marginTop: theme.spacing(16),
  },
  heroTitle: {
    fontWeight: "lighter",
  },
  subTitle: {
    marginBottom: theme.spacing(2)
  }
}))

const IndexPage = ({ data: { search } }) => {
  const classes = useStyles()
  return (
    <Layout hideSearchBar>
      <Box className={classes.hero}>
        <Typography variant="h3" component="h1" className={classes.heroTitle} gutterBottom>
          Find companies, organizations or projects
        </Typography>
        <Typography variant="subtitle1" className={classes.subTitle}>
          that receive European Union security funding
        </Typography>
        <Search {...search} />
      </Box>
      <Box className={classes.hero}>
        <Typography variant="h3" component="h2" className={classes.heroTitle} gutterBottom>
          Browse data
        </Typography>
        <Typography variant="subtitle1" className={classes.subTitle}>
          Directly jump into a funding program or topic of your interest
        </Typography>
        <SimpleBrowser data={search.store} />
      </Box>
    </Layout>
  )
}

export default IndexPage
