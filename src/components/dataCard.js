import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import LaunchIcon from "@material-ui/icons/Launch"
import DataDownload from "./downloadData"

const DefaultDescription = ({ color }) => (
  <>
    All data has been compiled via public sources or freedom of information
    requests to the relevant European Union or national institutions. Data may
    be incomplete or missing; some agencies or countries still haven’t responded
    to us, months later. Spreadsheets have been reformatted in order to fit into
    this data platform. If you see any errors, typos, translation issues or
    other problems, please get in touch:{" "}
    <Link href="mailto:hello@opensecuritydata.eu" color={color}>
      hello@opensecuritydata.eu
    </Link>
  </>
)

const DataCard = ({
  fileName,
  fileSize,
  sourceUrl,
  dataDescription,
  color = "primary",
}) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Source data
      </Typography>
      <Typography color="textSecondary" variant="caption" component="p">
        {dataDescription || <DefaultDescription color={color} />}
      </Typography>
      <DataDownload
        fileName={fileName}
        fileSize={fileSize}
        color={color}
        size="small"
      />
      {sourceUrl && (
        <Link href={sourceUrl} color={color}>
          {sourceUrl} <LaunchIcon fontSize="small" />
        </Link>
      )}
    </CardContent>
  </Card>
)

export default DataCard
