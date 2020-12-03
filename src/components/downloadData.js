import React from "react"
import filesize from "filesize"
import Fab from "@material-ui/core/Fab"
import GetAppIcon from "@material-ui/icons/GetApp"
import { Button } from "gatsby-theme-material-ui"

const DataDownload = ({ fileName, fileSize }) =>
  fileName && fileSize ? (
    <Fab variant="extended" component={Button} to={`/${fileName}`}>
      <GetAppIcon />
      {fileName} ({filesize(fileSize)})
    </Fab>
  ) : null

export default DataDownload
