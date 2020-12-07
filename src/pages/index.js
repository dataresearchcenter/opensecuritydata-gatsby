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
}))

const IndexPage = () => {
  const classes = useStyles()
  return (
    <Layout>
      <Box className={classes.hero}>
        <Typography variant="h3" className={classes.heroTitle} gutterBottom>
          Find companies, organizations or topics
        </Typography>
        <Typography variant="subtitle1">
          that receive funding from the EU for sourveillance technology
        </Typography>
        <Search />
      </Box>
      <Box className={classes.hero}>
        <Typography variant="h3" className={classes.heroTitle} gutterBottom>
          Browse data directly
        </Typography>
        <SimpleBrowser />
      </Box>
    </Layout>
  )
}

export default IndexPage
