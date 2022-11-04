import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ParticipationsTable from "../components/participationsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Flag from "../components/flag"
import CallCard from "../components/callCard.js"
import CardsWrapper from "../components/cardsWrapper"
import Viz, { VizCard } from "../components/viz"
import { TopicSchema } from "../schema"

export const query = graphql`
  query topicQuery($lookup: String!) {
    participations: allParticipationsJson(
      filter: { topicName: { eq: $lookup } }
    ) {
      nodes {
        ...ParticipationFragment
      }
    }
  }
`

export default function TopicTemplate({
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
        {node.name} {TopicSchema.chip()}
      </Typography>
      <Grid container spacing={4}>
        <Grid item md={9}>
          <Typography variant="h4" component="h2" gutterBottom>
            Funding
          </Typography>
          <ParticipationsTable rows={participations.nodes} />
        </Grid>
        <Grid item md={3}>
          <OverviewGrid>
            <AmountCard
              color={TopicSchema.color}
              viz={<Viz use="fundingPerProgram" data={participations.nodes} />}
              {...node}
            />
            <AttributeCard data={attributeData} />
            <CardsWrapper>
              <VizCard use="fundingPerYear" data={participations.nodes} />
              {node.callName && (
                <CallCard color={TopicSchema.color} {...node} />
              )}
            </CardsWrapper>
          </OverviewGrid>
        </Grid>
      </Grid>
    </Layout>
  )
}
