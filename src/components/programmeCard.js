import React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button } from "gatsby-theme-material-ui"
import Amount from "./amount"
import DataDownload from "./downloadData"
import { getProgrammeLink } from "../links"

const ProgrammeCard = ({
  data: { id, name, projects, beneficiaries, amount, proof },
  showHeader = true,
  showName = true,
  showLink = true,
  showData = true,
  showProof = true,
}) => (
  <Card>
    <CardContent>
      {showHeader && (
        <Typography color="textSecondary" gutterBottom>
          Funding programme
        </Typography>
      )}
      {showName && (
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
      )}
      {showData && (
        <>
          <Typography color="textSecondary">
            Total budget: <Amount value={amount} />
          </Typography>
          <Typography color="textSecondary">{`Projects: ${projects}`}</Typography>
          <Typography color="textSecondary">
            {`Beneficiaries: ${beneficiaries}`}
          </Typography>
        </>
      )}
      <Typography variant="body2" component="p">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </Typography>
    </CardContent>
    <CardActions>
      {showLink && (
        <Button to={getProgrammeLink({ name })} size="small">
          Details
        </Button>
      )}
      {showProof && <DataDownload {...proof} />}
    </CardActions>
  </Card>
)

export default ProgrammeCard
