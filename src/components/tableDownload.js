import React from "react"
import Papa from "papaparse"
import slugify from "slugify"
import { useLocation } from "@reach/router"
import GetAppIcon from "@material-ui/icons/GetApp"
import { Button } from "gatsby-theme-material-ui"
import { getCrumbs } from "./breadcrumbs"

const TableDownload = ({ rows, filters }) => {
  const dataUrl = `data:text/csv;base64,${btoa(
    unescape(encodeURIComponent(Papa.unparse(rows)))
  )}`
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
