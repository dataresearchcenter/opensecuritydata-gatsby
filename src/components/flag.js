import React from "react"
import "semantic-ui-flag/flag.css"

export default ({ iso }) => <i className={`${iso?.toLowerCase()} flag`}></i>
