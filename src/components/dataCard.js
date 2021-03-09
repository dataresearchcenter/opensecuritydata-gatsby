import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import LaunchIcon from "@material-ui/icons/Launch"
import DataDownload from "./downloadData"

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
        {dataDescription}
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
