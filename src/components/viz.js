import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  row: {
    position: "relative",
    display: ({ inline }) => (inline ? "display-block" : "block"),
    paddingBottom: theme.spacing(1),
    width: ({ inline, width }) => (inline ? `${width}%` : null),
  },
  bar: {
    position: ({ width }) => (width > 50 ? "relative" : null),
    height: theme.spacing(4),
    width: ({ width }) => `${width}%`,
    backgroundColor: ({ color }) => theme.palette[color].light,
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
    right: ({ width }) => (width > 50 ? theme.spacing(1) : null),
    left: ({ width }) => (width < 50 ? `${width + 2}%` : null),
    color: ({ color, width }) =>
      width > 50 ? "white" : theme.palette[color].light,
  },
}))

const Bar = ({ width, label, color }) => {
  const classes = useStyles({ color, width })
  return (
    <div className={classes.bar}>
      <Typography variant="caption" className={classes.valueLabel}>
        {label}
      </Typography>
    </div>
  )
}

const DataRow = ({ label, valueLabel, width, inline, color }) => {
  const classes = useStyles({ inline, width, color })
  return (
    <div className={classes.row}>
      <Typography variant="caption" className={classes.label}>
        {label}
      </Typography>
      <Bar width={inline ? 100 : width} label={valueLabel} color={color} />
    </div>
  )
}

export default ({
  data,
  title,
  inline = false,
  color = "primary",
  expand = false,
}) => {
  const classes = useStyles({ color })
  const [expanded, setExpanded] = React.useState(expand)
  const total = inline
    ? data.reduce((sum, { value }) => sum + value, 0)
    : Math.max(...data.map(({ value }) => value))
  data.sort((a, b) => b.value - a.value)
  let visibleData = []
  let shouldExpand = false
  if (expanded || data.length < 6) {
    visibleData = data.map(d => ({ ...d, width: (d.value / total) * 100 }))
  } else {
    visibleData = data
      .slice(0, 5)
      .map(d => ({ ...d, width: (d.value / total) * 100 }))
    shouldExpand = true
  }
  return (
    <div className={classes.root}>
      <Typography variant="overline" component="p">
        {title}
      </Typography>
      {visibleData.map((d, i) => (
        <DataRow key={i} inline={inline} color={color} {...d} />
      ))}
      {shouldExpand && (
        <Button
          onClick={() => setExpanded(true)}
          size="small"
          variant="outlined"
          color={color}
          startIcon={<ExpandMoreIcon />}
        >
          Show {data.length - 5} more
        </Button>
      )}
      {expanded && (
        <Button
          onClick={() => setExpanded(false)}
          size="small"
          variant="outlined"
          color={color}
          startIcon={<ExpandLessIcon />}
        >
          Show less
        </Button>
      )}
    </div>
  )
}

export function cast(value) {
  if (!value || isNaN(value)) return 0
  return parseFloat(value)
}
