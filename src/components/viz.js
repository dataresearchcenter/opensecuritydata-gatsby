import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  row: {
    position: "relative",
    display: "block",
    paddingBottom: theme.spacing(1),
  },
  rowInline: {
    position: "relative",
    display: "inline-block",
    height: theme.spacing(4),
  },
  barsecondary: {
    position: "relative",
    height: theme.spacing(4),
    backgroundColor: theme.palette.secondary.light,
    display: "block",
  },
  barprimary: {
    position: "relative",
    height: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
    display: "block",
  },
  label: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 100,
    color: "white",
  },
  valueLabel: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: "white",
  },
}))

const Bar = ({ width, label, color }) => {
  const classes = useStyles()
  return (
    <div className={classes[`bar${color}`]} style={{ width: `${width}%` }}>
      <Typography variant="caption" className={classes.valueLabel}>
        {label}
      </Typography>
    </div>
  )
}

const DataRow = ({ label, valueLabel, width, inline, color }) => {
  const classes = useStyles()
  return (
    <div
      className={inline ? classes.rowInline : classes.row}
      style={inline ? { width: `${width}%` } : null}
    >
      <Typography variant="caption" className={classes.label}>
        {label}
      </Typography>
      <Bar width={inline ? 100 : width} label={valueLabel} color={color} />
    </div>
  )
}

export default ({ data, title, inline = false, color = "primary" }) => {
  const classes = useStyles()
  const total = inline
    ? data.reduce((sum, { value }) => sum + value, 0)
    : Math.max(...data.map(({ value }) => value))
  data.sort((a, b) => a.value - b.value)
  return (
    <div className={classes.root}>
      <Typography variant="overline">{title}</Typography>
      {data
        .map(d => ({ ...d, width: (d.value / total) * 100 }))
        .map((d, i) => (
          <DataRow key={i} inline={inline} color={color} {...d} />
        ))}
    </div>
  )
}

export function cast(value) {
  if (!value || isNaN(value)) return 0
  return parseFloat(value)
}
