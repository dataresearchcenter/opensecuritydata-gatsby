import React from "react"
import { Link } from "gatsby-theme-material-ui"
import { getCountryLink } from "../links"
import Flag from "./flag"

export default ({ name, iso, data, ...props }) => {
  if (!!data) {
    if (typeof data === "object") {
      name = data.name
      iso = data.iso
    } else {
      iso = data
    }
  }
  return (
    <Link to={getCountryLink({ iso })} {...props}>
      <Flag iso={iso} />{name || iso.toUpperCase()}
    </Link>
  )
}
