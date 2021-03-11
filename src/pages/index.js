import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Layout from "../components/layout"
import Search from "../components/search"
import SimpleBrowser from "../components/simpleBrowser"

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

const IndexPage = () => {
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
        <Search color="secondary" />
      </Box>
      <Box className={classes.hero}>
        <Typography variant="h3" component="h2" className={classes.heroTitle} gutterBottom>
          Browse data
        </Typography>
        <Typography variant="subtitle1" className={classes.subTitle}>
          Directly jump into a funding program, project, or topic of your interest
        </Typography>
        <SimpleBrowser />
      </Box>
    </Layout>
  )
}

export default IndexPage
