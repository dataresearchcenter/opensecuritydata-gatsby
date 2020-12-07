import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import AttributeTable from "./attributeTable"

const AttributeCard = ({ data, hideTitle, ...props }) => (
  <Card>
    <CardContent>
      {!hideTitle && (
        <Typography color="textSecondary" gutterBottom>
          Information
        </Typography>
      )}
      <AttributeTable data={data} {...props} />
    </CardContent>
  </Card>
)

export default AttributeCard
