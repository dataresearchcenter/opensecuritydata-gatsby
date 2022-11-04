import React, { useState } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { ThemeProvider, makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import CssBaseline from "@material-ui/core/CssBaseline"
import Slide from "@material-ui/core/Slide"
import AppBar from "@material-ui/core/AppBar"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Toolbar from "@material-ui/core/Toolbar"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import HomeIcon from "@material-ui/icons/Home"
import MenuIcon from "@material-ui/icons/Menu"
import { Button, IconButton } from "gatsby-theme-material-ui"
import theme from "../theme"
import SearchStore from "../searchStore"
import Breadcrumbs from "./breadcrumbs"
import SearchBar from "./searchBar"
import SEO from "./seo"

import "../fonts.css"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: ({ isMobile }) => (isMobile ? 0 : theme.spacing(2)),
  },
  title: {
    flexGrow: 1,
  },
  route: {
    fontWeight: ({ isMobile }) => (isMobile ? "bold" : "normal"),
  },
  content: {
    paddingTop: ({ isMobile }) =>
      isMobile ? theme.spacing(10) : theme.spacing(12),
    paddingBottom: theme.spacing(6),
  },
  bcmbs: {
    paddingBottom: theme.spacing(4),
  },
}))

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const MENU = [
  ["About", "/about"],
  ["Stories", "/stories"],
  ["Data", "/data"],
  [null, null],
  ["Countries", "/countries"],
  ["Programs", "/programs"],
  ["Projects", "/projects"],
  ["Beneficiaries", "/beneficiaries"],
]

const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMenu = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        {MENU.map(([label, url]) => {
          if (!label) return <Divider />
          return (
            <MenuItem key={url} onClick={() => navigate(url)}>
              {label}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

const DesktopMenu = () =>
  MENU.map(([label, url]) => {
    if (!label) return <Divider orientation="vertical" flexItem />
    return (
      <Button key={url} color="inherit" to={url}>
        {label}
      </Button>
    )
  })

export default function Layout({ children, route, title, ...props }) {
  const {
    site,
    localSearchData: { publicIndexURL, publicStoreURL },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
          title
        }
      }
      localSearchData {
        publicIndexURL
        publicStoreURL
      }
    }
  `)

  // init searchstore
  SearchStore.init({ publicIndexURL, publicStoreURL })

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const showSearchBar = !props.hideSearchBar
  const classes = useStyles({ isMobile })
  return (
    <ThemeProvider theme={theme}>
      <SEO />
      <CssBaseline />
      <section className={classes.root}>
        <HideOnScroll {...props}>
          <AppBar position="fixed" color="default" className={classes.appBar}>
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
                {!isMobile && site.siteMetadata.title}
              </Typography>
              {!isMobile && <Divider orientation="vertical" flexItem />}
              {isMobile ? <MobileMenu /> : <DesktopMenu />}
              {!isMobile && <Divider orientation="vertical" flexItem />}
              {showSearchBar && <SearchBar />}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Container maxWidth="xl">
          <Box className={classes.content}>
            {!isMobile && (
              <div className={classes.bcmbs}>
                <Breadcrumbs />
              </div>
            )}
            {children}
          </Box>
        </Container>
      </section>
      }
    </ThemeProvider>
  )
}
