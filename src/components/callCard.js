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
  theme,
}) => (
  <Card className={className}>
    <CardContent>
      {callId && (
        <div style={{ paddingBottom: theme.spacing(1) }}>
          <Typography color="textSecondary">Call id</Typography>
          <Typography variant="body2" component="p">
            {callId}
          </Typography>
        </div>
      )}
      {callName && (
        <div style={{ paddingBottom: theme.spacing(1) }}>
          <Typography color="textSecondary">Call name</Typography>
          <Link
            to={`/projects/?callName=${encodeURIComponent(callName)}`}
            color={color}
          >
            {callName}
          </Link>
        </div>
      )}
      {workProgram && (
        <div style={{ paddingBottom: theme.spacing(1) }}>
          <Typography color="textSecondary">Work program</Typography>
          <Link
            color={color}
            to={`/projects/?workProgram=${encodeURIComponent(workProgram)}`}
          >
            {workProgram}
          </Link>
        </div>
      )}
      {topicName && (
        <div style={{ paddingBottom: theme.spacing(1) }}>
          <Typography color="textSecondary">Topic</Typography>
          <Typography variant="body2" component="p" gutterBottom>
            <Link color={color} to={getTopicLink({ name: topicName })}>
              {topicName}
            </Link>
          </Typography>
        </div>
      )}
      {sourceUrl && (
        <div>
          <Typography color="textSecondary">More information</Typography>
          <Typography variant="body2" component="p" gutterBottom>
            <Link color={color} to={sourceUrl}>
              CORDIS <LaunchIcon fontSize="small" />
            </Link>
          </Typography>
        </div>
      )}
    </CardContent>
  </Card>
)

export default withTheme(CallCard)
