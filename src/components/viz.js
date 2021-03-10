import React from "react"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import {
  getCountryLink,
  getProjectLink,
  getProgramLink,
  getBeneficiaryLink,
} from "../links"
import Amount from "./amount"
import Flag from "./flag"
import CountryNames from "../data/countryNames.json"

const cast = value => (!value || isNaN(value) ? 0 : parseFloat(value))

const sum = (acc, data) => acc + cast(data.amount)

const addAmountLabel = data => ({
  ...data,
  valueLabel: <Amount value={data.value} abbrev />,
})

const getLabel = (label, grouper = null) =>
  grouper === "country"
    ? [
        <>
          <Flag iso={label} /> {CountryNames[label]}
        </>,
        CountryNames[label],
      ]
    : label.indexOf(" - ") > 0
    ? [label.split(" - ")[0], label]
    : [label, label]

const getGroupedData = (payments, grouper, getLink) => {
  const data = [...new Set(payments.map(d => d[grouper]))]
    .filter(g => !!g)
    .map(g => ({
      label: getLabel(g, grouper),
      url: getLink(g),
      value: payments.filter(d => g === d[grouper]).reduce(sum, 0),
    }))
    .map(addAmountLabel)
  data.sort((a, b) => b.value - a.value)
  return data
}

const VISUALIZATIONS = {
  fundingPerYear: payments => {
    payments = payments.filter(({ startDate }) => !!startDate)
    const data = [
      ...new Set(payments.map(({ startDate }) => startDate.substring(0, 4))),
    ]
      .map(y => ({
        label: [y, y],
        value: payments
          .filter(({ startDate }) => startDate.indexOf(y) === 0)
          .reduce(sum, 0),
      }))
      .map(addAmountLabel)
    data.sort((a, b) => parseInt(a.label) - parseInt(b.label))
    return {
      data,
      title: "Funding per year",
    }
  },
  fundingPerCountry: payments => {
    return {
      data: getGroupedData(payments, "country", iso => getCountryLink({ iso })),
      title: "Funding per country",
    }
  },
  fundingPerProject: payments => {
    return {
      data: getGroupedData(payments, "purpose", name =>
        getProjectLink({ name })
      ),
      title: "Funding per project",
    }
  },
  fundingPerProgram: payments => {
    return {
      data: getGroupedData(payments, "program", name =>
        getProgramLink({ name })
      ),
      title: "Funding per program",
    }
  },
  fundingPerBeneficiary: payments => {
    return {
      data: getGroupedData(payments, "beneficiaryName", name =>
        getBeneficiaryLink({ name })
      ),
      title: "Funding per beneficiary",
    }
  },
}

const useStyles = makeStyles(theme => ({
  title: {
    paddingBottom: theme.spacing(1),
  },
  row: {
    position: "relative",
    display: "block",
    paddingBottom: theme.spacing(1),
    height: theme.spacing(4),
    width: "100%",
    cursor: ({ url }) => (url ? "pointer" : null),
    "&:hover .bar": {
      backgroundColor: ({ color }) => theme.palette[color].main,
    },
    "&:hover .label": {
      color: ({ color }) => theme.palette[color].main,
    },
    "&:hover .valueLabel": {
      color: ({ color }) => theme.palette[color].main,
    },
  },
  bar: {
    position: "absolute",
    top: 0,
    height: theme.spacing(0.8),
    width: ({ width }) => `${width}%`,
    backgroundColor: ({ color }) => theme.palette[color].light,
    display: "block",
  },
  label: {
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    color: ({ color }) => theme.palette[color].light,
    width: "80%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  valueLabel: {
    position: "absolute",
    top: theme.spacing(1),
    right: 0,
    color: ({ color }) => theme.palette[color].light,
  },
}))

const Bar = ({ width, label, color, url }) => {
  const classes = useStyles({ color, width, url })
  return <div className={`${classes.bar} bar`} />
}

const DataRow = ({
  label: [renderedLabel, textLabel],
  valueLabel,
  width,
  color,
  url,
}) => {
  const classes = useStyles({ width, color, url })
  return (
    <div
      className={classes.row}
      onClick={() => (url ? navigate(url) : null)}
      aria-hidden="true"
      title={textLabel}
    >
      <Typography variant="caption" className={`${classes.label} label`}>
        {renderedLabel}
      </Typography>
      <Typography
        variant="caption"
        className={`${classes.valueLabel} valueLabel`}
      >
        {valueLabel}
      </Typography>
      <Bar width={width} color={color} url={url} />
    </div>
  )
}

const Viz = ({ use, data: useData, color = "primary", expand = false }) => {
  const { data, title } = VISUALIZATIONS[use](useData)
  const classes = useStyles({ color })
  const [expanded, setExpanded] = React.useState(expand)
  const total = Math.max(...data.map(({ value }) => value))
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
    <div>
      <Typography
        color="textSecondary"
        component="p"
        className={classes.title}
        gutterBottom
      >
        {title}
      </Typography>
      {visibleData.map((d, i) => (
        <DataRow key={i} color={color} {...d} />
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
