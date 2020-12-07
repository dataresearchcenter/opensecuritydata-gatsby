import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(8),
  },
}))

const OverviewGrid = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container spacing={4} className={classes.root}>
      {children.map((c, i) => (
        <Grid item md={4} key={i}>
          {c}
        </Grid>
      ))}
    </Grid>
  )
}

export default OverviewGrid
