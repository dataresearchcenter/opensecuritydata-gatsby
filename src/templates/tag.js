import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ParticipationsTable from "../components/participationsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import { TagSchema } from "../schema"
import Viz, { VizCard } from "../components/viz"

export const query = graphql`
  query tagQuery($lookup: String!) {
    participations: allParticipationsJson(filter: { tags: { regex: $lookup } }) {
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
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {TagSchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard
          color={TagSchema.color}
          viz={<Viz use="fundingPerProgram" data={participations.nodes} />}
          {...node}
        />
        <AttributeCard data={attributeData} />
        <VizCard use="fundingPerYear" data={participations.nodes} />
      </OverviewGrid>
      <Typography variant="h4" component="h2" gutterBottom>
        Funding
      </Typography>
      <ParticipationsTable rows={participations.nodes} />
    </Layout>
  )
}
