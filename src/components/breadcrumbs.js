import React from "react"
import Typography from "@material-ui/core/Typography"
import MUIBreadcrumbs from "@material-ui/core/Breadcrumbs"
import { Link } from "gatsby-theme-material-ui"

const getCrumbs = pathname => {
  pathname = pathname.substring(1).replace(/\/$/, "")
  if (!pathname) return []
  const paths = pathname.split("/")
  return (
    paths.length > 0 &&
    paths.map((p, i) => ({
      name: p.replace(/[-_]/g, " ").replace(/^\w/, p[0].toUpperCase()),
      path: i + 1 < paths.length && `/${paths.slice(0, i + 1).join("/")}`,
    }))
  )
}

const Breadcrumbs = ({ location: { pathname } }) => (
  <MUIBreadcrumbs aria-label="breadcrumb">
    <Link color="inherit" to="/">
      Start
    </Link>
    {getCrumbs(pathname).map(({ name, path }) =>
      path ? (
        <Link color="inherit" key={path} to={path}>
          {name}
        </Link>
      ) : (
        <Typography key={name} color="textPrimary">
          {name}
        </Typography>
      )
    )}
  </MUIBreadcrumbs>
)

export default Breadcrumbs
