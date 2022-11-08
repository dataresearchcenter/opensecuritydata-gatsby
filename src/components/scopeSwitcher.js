import * as React from "react"
import { Link } from "gatsby-theme-material-ui"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

export default function ScopeSwitcher({ scope, onChange }) {
  const handleScopeChange = (event, newScope) => {
    if (!!newScope) {
      onChange(newScope)
    }
  }

  return (
    <div>
      <ToggleButtonGroup
        value={scope}
        exclusive
        onChange={handleScopeChange}
        aria-label="text alignment"
      >
        <ToggleButton value="all" aria-label="military">
          all
        </ToggleButton>
        <ToggleButton value="military" aria-label="military">
          military
        </ToggleButton>
        <ToggleButton value="nonMilitary" aria-label="non military">
          non-military
        </ToggleButton>
      </ToggleButtonGroup>
      {" "}<Link to="/data">What does that mean?</Link>
    </div>
  )
}
