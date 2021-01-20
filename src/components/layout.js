import React, { useState } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { Location } from "@reach/router"
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles"
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
import Typography from "@material-ui/core/Typography"
import HomeIcon from "@material-ui/icons/Home"
import MenuIcon from "@material-ui/icons/Menu"
import { Button, IconButton } from "gatsby-theme-material-ui"
import Breadcrumbs from "./breadcrumbs"

import "../fonts.css"

const theme = responsiveFontSizes(
  createMuiTheme({
    spacing: 12,
    typography: {
      fontSize: 15,
      fontFamily: "Work Sans",
    },
    shape: {
      borderRadius: 0,
    },
    palette: {
      background: {
        default: "#eee",
      },
    },
    shadows: [...new Array(25)].map(() => "none"),
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
  })
)

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
        {MENU.map(([label, url]) => (
          <MenuItem key={url} onClick={() => navigate(url)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

const DesktopMenu = () =>
  MENU.map(([label, url]) => (
    <Button key={url} color="inherit" to={url}>
      {label}
    </Button>
  ))

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const classes = useStyles({ isMobile })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Location>
        {location => (
          <section className={classes.root}>
            <HideOnScroll {...props}>
              <AppBar
                position="fixed"
                color="default"
                className={classes.appBar}
              >
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
                    {route && (
                      <span className={classes.route}>
                        {!isMobile && " | "}
                        {route}
                      </span>
                    )}
                  </Typography>
                  {isMobile ? <MobileMenu /> : <DesktopMenu />}
                </Toolbar>
              </AppBar>
            </HideOnScroll>
            <Container maxWidth="lg">
              <Box className={classes.content}>
                {!isMobile && (
                  <div className={classes.bcmbs}>
                    <Breadcrumbs {...location} />
                  </div>
                )}
                {children}
              </Box>
            </Container>
          </section>
        )}
      </Location>
    </ThemeProvider>
  )
}
