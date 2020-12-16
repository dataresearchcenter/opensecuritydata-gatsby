import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby-theme-material-ui"
import SCHEMA from "../schema"
import { getBeneficiaryGroupLink } from "../links"

export default ({ beneficiaryGroup, legalForm, name }) => (
  <Card>
    <CardContent>
      <Typography color={SCHEMA[legalForm].color}>{name}</Typography>
      belongs to the beneficiary group{" "}
      <Link
        color={SCHEMA[legalForm].color}
        to={getBeneficiaryGroupLink({ name: beneficiaryGroup })}
      >
        {beneficiaryGroup}
      </Link>
    </CardContent>
  </Card>
)
