import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Amount from "./amount"

const cast = value => (!value || isNaN(value) ? 0 : parseFloat(value))

const sum = (acc, { amount }) => acc + cast(amount)

const addAmountLabel = data => ({
  ...data,
  valueLabel: <Amount value={data.value} />,
})

const getLabel = label =>
  label.indexOf(" - ") > 0 ? label.split(" - ")[0].substring(0, 20) : label // FIXME topic names

const getGroupedData = (payments, grouper) => {
  const data = [...new Set(payments.map(d => d[grouper]))]
    .map(g => ({
      label: getLabel(g),
      value: payments.filter(d => g === d[grouper]).reduce(sum, 0),
    }))
    .map(addAmountLabel)
  data.sort((a, b) => b.value - a.value)
  return data
}

const VISUALIZATIONS = {
  fundingPerYear: payments => {
    const data = [
      ...new Set(payments.map(({ startDate }) => startDate.substring(0, 4))),
    ]
      .map(y => ({
        label: y,
        value: payments
          .filter(({ startDate }) => startDate.indexOf(y) === 0)
          .reduce(sum, 0),
      }))
      .map(addAmountLabel)
    data.sort((a, b) => b.label - a.label)
    return {
      data,
      title: "Funding per year",
    }
  },
  fundingPerCountry: payments => {
    return {
      data: getGroupedData(payments, "country"),
      title: "Funding per country",
    }
  },
  fundingPerProject: payments => {
    return {
      data: getGroupedData(payments, "purpose"),
      title: "Funding per project",
    }
  },
  fundingPerProgramme: payments => {
    return {
      data: getGroupedData(payments, "programme"),
      title: "Funding per programme",
    }
  },
  fundingPerBeneficiary: payments => {
    return {
      data: getGroupedData(payments, "beneficiary_name"),
      title: "Funding per beneficiary",
    }
  },
}

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

const Viz = ({
  use,
  data: useData,
  inline = false,
  color = "primary",
  expand = false,
}) => {
  const { data, title } = VISUALIZATIONS[use](useData)
  const classes = useStyles({ color })
  const [expanded, setExpanded] = React.useState(expand)
  const total = inline
    ? data.reduce((sum, { value }) => sum + value, 0)
    : Math.max(...data.map(({ value }) => value))
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

const VizCard = ({ ...props }) => (
  <Card>
    <CardContent>
      <Viz {...props} />
    </CardContent>
  </Card>
)

export default Viz
export { VizCard }
