import React from "react"
import { withTheme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import LaunchIcon from "@material-ui/icons/Launch"
import { Link } from "gatsby-theme-material-ui"
import { getTopicLink } from "../links"

const CallCard = ({
  className,
  color,
  topicName,
  callId,
  callName,
  workProgram,
  sourceUrl,
}) => (
  <Card className={className}>
    <CardContent>
      {callId && (
        <>
          <Typography color="textSecondary">Call id</Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {callId}
          </Typography>
        </>
      )}
      {callName && (
        <>
          <Typography color="textSecondary">Call name</Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {callName}
          </Typography>
        </>
      )}
      {workProgram && (
        <>
          <Typography color="textSecondary">Work program</Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {workProgram}
          </Typography>
        </>
      )}
      {topicName && (
        <>
          <Typography color="textSecondary">Topic</Typography>
          <Typography variant="body2" component="p" gutterBottom>
            <Link color={color} to={getTopicLink({ name: topicName })}>
              {topicName}
            </Link>
          </Typography>
        </>
      )}
      {sourceUrl && (
        <>
          <Typography color="textSecondary">More information</Typography>
          <Typography variant="body2" component="p" gutterBottom>
            <Link color={color} to={sourceUrl}>
              CORDIS <LaunchIcon fontSize="small" />
            </Link>
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
)

export default withTheme(CallCard)
