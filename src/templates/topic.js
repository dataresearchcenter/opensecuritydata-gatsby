import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import PaymentsTable from "../components/paymentsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Flag from "../components/flag"
import CallCard from "../components/callCard.js"
import Viz, { VizCard } from "../components/viz"
import { TopicSchema } from "../schema"

export const query = graphql`
  query topicQuery($lookup: String!) {
    payments: allPaymentsJson(filter: { topicName: { eq: $lookup } }) {
      nodes {
        id
        beneficiaryName
        notes
        amount
        startDate
        endDate
        purpose
        programme
        legalForm
        country
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  moreCard: {
    marginTop: theme.spacing(4),
  },
}))

export default function TopicTemplate({
  pageContext: { node, lookup, route, title },
  data: { payments },
}) {
  const classes = useStyles()
  const attributeData = {
    beneficiaries: node.beneficiaries,
    payments: node.payments,
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
      <OverviewGrid>
        <AmountCard
          color={TopicSchema.color}
          viz={<Viz use="fundingPerProgramme" data={payments.nodes} />}
          {...node}
        />
        <AttributeCard data={attributeData} />
        <>
          <VizCard use="fundingPerYear" data={payments.nodes} />
          {node.callName && (
            <CallCard
              className={classes.moreCard}
              color={TopicSchema.color}
              {...node}
            />
          )}
        </>
      </OverviewGrid>
      <Typography variant="h4" component="h2" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable rows={payments.nodes} />
    </Layout>
  )
}
