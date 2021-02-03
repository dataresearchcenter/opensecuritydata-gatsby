import React from "react"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import Switch from "@material-ui/core/Switch"
import Tooltip from "@material-ui/core/Tooltip"
import Flag from "./flag"

export default ({ original, translations }) => {
  const translation = translations.find(({ key }) => key === original)
  if (!!translation) {
    const { key, value, language } = translation
    const [toggled, toggle] = React.useState(false)
    const msg = toggled ? "Show translation" : "Show original"
    return (
      <span>
        <Tooltip title={msg}>
          <FormControl component="div">
            <FormControlLabel
              value="toggle"
              control={
                <Switch
                  size="small"
                  color="default"
                  checked={toggled}
                  onChange={() => toggle(!toggled)}
                />
              }
              label={<Flag iso={language} />}
              labelPlacement="end"
            />
          </FormControl>
        </Tooltip>
        {toggled ? key : value}
      </span>
    )
  } else {
    return <>{original}</>
  }
}
