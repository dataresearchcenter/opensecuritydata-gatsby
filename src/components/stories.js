import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Story from "./story"

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(8),
    flexGrow: 1,
  },
}))

const Stories = ({ stories }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justify="center" spacing={8}>
      {stories
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(s => (
          <Grid key={s.url} item xs={12} sm={6} md={4} lg={3}>
            <Story {...s} />
          </Grid>
        ))}
    </Grid>
  )
}

export default Stories
