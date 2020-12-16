import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby-theme-material-ui"
import SCHEMA from "../schema"

export default ({ companyGroup, companyGroupName, legalForm, name }) => (
  <Card>
    <CardContent>
      <Typography color={SCHEMA[legalForm].color}>{name}</Typography>
      belongs to the company group{" "}
      <Link color={SCHEMA[legalForm].color} to="/">
        {companyGroup}
      </Link>
    </CardContent>
  </Card>
)
