import React from "react"
import Papa from "papaparse"
import slugify from "slugify"
import { useLocation } from "@reach/router"
import GetAppIcon from "@material-ui/icons/GetApp"
import { Button } from "gatsby-theme-material-ui"
import { getCrumbs } from "./breadcrumbs"

const toB64 = value =>
  typeof btoa !== "undefined"
    ? btoa(value)
    : Buffer.from(value).toString("base64") // node build

const TableDownload = ({ rows, filters }) => {
  const columns = Object.keys(rows[0]).filter(k => k !== "id")
  const data = toB64(
    unescape(encodeURIComponent(Papa.unparse(rows, { columns })))
  )
  const dataUrl = `data:text/csv;base64,${data}`
  const { pathname } = useLocation()
  const { name } = getCrumbs(pathname).pop()
  const filtersName = Object.values(filters)
    .map(v => slugify(v).substr(0, 25))
    .join("_")
  const fileName = `opensecuritydata_${slugify(name)}_${
    filtersName || "data"
  }.csv`
  return (
    <Button to={dataUrl} startIcon={<GetAppIcon />} download={fileName}>
      Download {rows.length} rows
    </Button>
  )
}

export default TableDownload
