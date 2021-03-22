import React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby-theme-material-ui"
import Amount from "./amount"
import DataDownload from "./downloadData"
import { getProgramLink } from "../links"

const ProgramCard = ({
  id,
  name,
  projects,
  beneficiaries,
  amount,
  url,
  description,
  fileName,
  fileSize,
  showHeader = true,
  showName = true,
  showData = true,
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
          <Link to={getProgramLink({ name })}>{name}</Link>
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
      <DataDownload {...{ fileName, fileSize }} />
    </CardActions>
  </Card>
)

export default ProgramCard
