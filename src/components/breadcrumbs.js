import React from "react"
import { useLocation } from "@reach/router"
import Typography from "@material-ui/core/Typography"
import MUIBreadcrumbs from "@material-ui/core/Breadcrumbs"
import { Link } from "gatsby-theme-material-ui"
import CountryNames from "../data/countryNames.json"

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

const getLabel = name => CountryNames[name.toLowerCase()] || name

const Breadcrumbs = () => {
  const { pathname } = useLocation()
  return (
    pathname.length > 1 && (
      <MUIBreadcrumbs aria-label="breadcrumb" variant="caption">
        <Link color="inherit" to="/">
          Start
        </Link>
        {getCrumbs(pathname).map(({ name, path }) =>
          path ? (
            <Link color="inherit" key={path} to={path}>
              {name}
            </Link>
          ) : (
            <Typography key={name} color="textPrimary" variant="caption">
              {name.length < 100
                ? getLabel(name)
                : `${name.substring(0, 100)}...`}
            </Typography>
          )
        )}
      </MUIBreadcrumbs>
    )
  )
}

export default Breadcrumbs
export { getCrumbs }
