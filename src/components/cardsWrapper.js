import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
  },
}))

export default function CardsWrapper({ children }) {
  const classes = useStyles()
  return children.map((c, i) => (
    <div key={i} className={i > 0 ? classes.root : null}>
      {c}
    </div>
  ))
}
