import React from "react"
import filesize from "filesize"
import Fab from "@material-ui/core/Fab"
import GetAppIcon from "@material-ui/icons/GetApp"
import { Button } from "gatsby-theme-material-ui"

const DataDownload = ({ fileName, fileSize, ...props }) =>
  fileName && fileSize ? (
    <Fab variant="extended" component={Button} to={`/${fileName}`} {...props}>
      <GetAppIcon />
      {fileName} ({filesize(fileSize)})
    </Fab>
  ) : null

export default DataDownload
