import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import DataDownload from "./downloadData"

const DataCard = ({ fileName, fileSize, sourceUrl, color = "primary" }) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        Source data
      </Typography>
      {sourceUrl && (
        <Button component="a" href={sourceUrl}>
          {sourceUrl}
        </Button>
      )}
      <Typography color="textSecondary" variant="caption" component="p">
        Tenetur sunt deleniti natus est ea officia ea. Fuga id molestiae vitae
        quia aut ab. Quisquam voluptas consequatur quo repellat qui molestiae
        impedit fuga. Possimus delectus perspiciatis molestiae et quia
        asperiores qui. Vitae qui aliquid voluptas tenetur nihil dolorum itaque.
        Vel deleniti ea sint facere.
      </Typography>
      <DataDownload
        fileName={fileName}
        fileSize={fileSize}
        color={color}
        size="small"
      />
    </CardContent>
  </Card>
)

export default DataCard
