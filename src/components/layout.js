import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Location } from "@reach/router"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import HomeIcon from "@material-ui/icons/Home"
import { Button, IconButton } from "gatsby-theme-material-ui"
import Breadcrumbs from "./breadcrumbs"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  route: {
    fontWeight: "normal",
  },
}))

export default function Layout({ children, route, title, ...props }) {
  const { site } = useStaticQuery(graphql`
    query siteMetadataQuery {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `)
  const classes = useStyles()
  return (
    <Location>
      {location => (
        <section className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                to="/"
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {site.siteMetadata.title}
                {route && <span className={classes.route}> | {route}</span>}
              </Typography>
              <Button color="inherit" to="/about">
                About
              </Button>
              <Button color="inherit" to="/stories">
                Stories
              </Button>
              <Button color="inherit" to="/data">
                Data
              </Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <Breadcrumbs {...location} />
            {children}
          </Container>
        </section>
      )}
    </Location>
  )
}
