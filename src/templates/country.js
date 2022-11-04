import React from "react"
import { graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ParticipationsTable from "../components/participationsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Flag from "../components/flag"
import { CountrySchema } from "../schema"
import Viz, { VizCard } from "../components/viz"

export const query = graphql`
  query countryQuery($lookup: String!) {
    participations: allParticipationsJson(
      filter: { country: { eq: $lookup } }
    ) {
      nodes {
        ...ParticipationFragment
      }
    }
  }
`

export default function countryTemplate({
  pageContext: { node, lookup, route, title },
  data: { participations },
}) {
  const attributeData = {
    beneficiaries: node.beneficiaries,
    projects: node.projects,
    activity_start: node.startDate,
    activity_end: node.endDate,
  }
  return (
    <Layout route={route} title={title}>
      <Flag iso={node.iso} />
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {CountrySchema.chip()}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={9}>
          <Typography variant="h4" component="h2" gutterBottom>
            Funding
          </Typography>
          <ParticipationsTable
            rows={participations.nodes}
            exclude={["country"]}
          />
        </Grid>
        <Grid item md={3}>
          <OverviewGrid>
            <AmountCard
              color={CountrySchema.color}
              viz={<Viz use="fundingPerProgram" data={participations.nodes} />}
              {...node}
            />
            <AttributeCard data={attributeData} />
            <VizCard use="fundingPerYear" data={participations.nodes} />
          </OverviewGrid>
        </Grid>
      </Grid>
    </Layout>
  )
}
