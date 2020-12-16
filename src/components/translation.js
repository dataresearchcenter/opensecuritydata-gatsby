import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import Button from "@material-ui/core/Button"
import Flag from "./flag"

export default ({ language, original }) => (
  <Tooltip title={original}>
    <Button>
      Original text
      <Flag iso={language} />
    </Button>
  </Tooltip>
)
