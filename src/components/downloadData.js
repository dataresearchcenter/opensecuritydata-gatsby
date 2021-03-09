import React from "react"
import filesize from "filesize"
import GetAppIcon from "@material-ui/icons/GetApp"
import { Button } from "gatsby-theme-material-ui"

const DataDownload = ({ fileName, fileSize, color = "primary" }) =>
  fileName ? (
    <Button to={`/${fileName}`} startIcon={<GetAppIcon />} color={color}>
      {fileName} {fileSize && `(${filesize(fileSize)})`}
    </Button>
  ) : null

export default DataDownload
