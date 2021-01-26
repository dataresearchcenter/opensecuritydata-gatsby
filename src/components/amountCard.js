import React from "react"
import { withTheme } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Amount from "./amount"
import Date from "./date"

const AmountCard = ({
  title = "Total funding",
  value,
  amount,
  startDate,
  endDate,
  color,
  viz,
  theme
}) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" color={color}>
        <Amount value={value || amount} />
      </Typography>
      {startDate && endDate && (
        <Typography color="textSecondary">
          from <Date date={startDate} yearOnly /> to{" "}
          <Date date={endDate} yearOnly />
        </Typography>
      )}
      <Typography color="textSecondary" variant="caption" component="p">
        Total amount of EU funding for projects related to surveillance
        technology
        {startDate && endDate && " in the given period."}
      </Typography>
      {viz && <div style={{ paddingTop: theme.spacing(2) }}>{viz}</div>}
    </CardContent>
  </Card>
)

export default withTheme(AmountCard)
