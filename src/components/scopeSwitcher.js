import * as React from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

export default function ScopeSwitcher({ scope, onChange }) {
  const handleScopeChange = (event, newScope) => {
    onChange(newScope)
  }

  return (
    <ToggleButtonGroup
      value={scope}
      exclusive
      onChange={handleScopeChange}
      aria-label="text alignment"
    >
      <ToggleButton value="military" aria-label="military">
        military
      </ToggleButton>
      <ToggleButton value="nonMilitary" aria-label="non military">
        non-military
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
