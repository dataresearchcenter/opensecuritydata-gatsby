import React from "react"
import slugify from "slugify"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button } from "gatsby-theme-material-ui"

const ProgrammeCard = ({
  data: { id, name, projects, beneficiaries, total_amount },
  showHeader = true,
  showName = true,
  showLink = true,
}) => (
  <Card>
    <CardContent>
      {showHeader && (
        <Typography color="textSecondary" gutterBottom>
          FUNDING PROGRAMME
        </Typography>
      )}
      {showName && (
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
      )}
      <Typography color="textSecondary">
        {`Total budget: ${total_amount} €`}
      </Typography>
      <Typography color="textSecondary">{`Projects: ${projects}`}</Typography>
      <Typography color="textSecondary">
        {`Beneficiaries: ${beneficiaries}`}
      </Typography>
      <Typography variant="body2" component="p">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </Typography>
    </CardContent>
    {showLink && (
      <CardActions>
        <Button to={`/programmes/${slugify(name)}`} size="small">
          Details
        </Button>
      </CardActions>
    )}
  </Card>
)

export default ProgrammeCard
