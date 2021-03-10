import React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button, Link } from "gatsby-theme-material-ui"
import Amount from "./amount"
import DataDownload from "./downloadData"
import { getProgramLink } from "../links"

const ProgramCard = ({
  id,
  name,
  projects,
  beneficiaries,
  amount,
  proof,
  url,
  description,
  showHeader = true,
  showName = true,
  showLink = true,
  showData = true,
  showProof = true,
  className,
}) => (
  <Card className={className}>
    <CardContent>
      {showHeader && (
        <Typography color="textSecondary" gutterBottom>
          Funding program
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
        {description} <Link to={url}>More information on the EU website</Link>
      </Typography>
    </CardContent>
    <CardActions>
      {showLink && (
        <Button color="primary" to={getProgramLink({ name })} size="small">
          Browse data
        </Button>
      )}
      {showProof && <DataDownload {...proof} />}
    </CardActions>
  </Card>
)

export default ProgramCard
