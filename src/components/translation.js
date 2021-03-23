import React from "react"
import { graphql } from "gatsby"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import Switch from "@material-ui/core/Switch"
import Tooltip from "@material-ui/core/Tooltip"
import Flag from "./flag"

export default ({ original, translations, identifier }) => {
  const translation = translations.find(({ key }) => key.indexOf(identifier) > -1)
  if (!!translation) {
    const { translated, language } = translation
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
        {toggled ? original : translated}
      </span>
    )
  } else {
    return <>{original}</>
  }
}

export const query = graphql`
  fragment TranslationFragment on TranslationsJson {
    key: name
    translated: description
    language: country
  }
`
