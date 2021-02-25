import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import PaymentsTable from "../components/paymentsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import { CategorySchema } from "../schema"
import Viz, { VizCard } from "../components/viz"

export const query = graphql`
  query categoryQuery($lookup: String!) {
    payments: allPaymentsJson(filter: { categories: { regex: $lookup } }) {
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

export default function countryTemplate({
  pageContext: { node, lookup, route, title },
  data: { payments },
}) {
  const attributeData = {
    beneficiaries: node.beneficiaries,
    payments: node.payments,
    projects: node.projects,
    activity_start: node.startDate,
    activity_end: node.endDate,
  }
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {CategorySchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard
          color={CategorySchema.color}
          viz={<Viz use="fundingPerProgramme" data={payments.nodes} />}
          {...node}
        />
        <AttributeCard data={attributeData} />
        <VizCard use="fundingPerYear" data={payments.nodes} />
      </OverviewGrid>
      <Typography variant="h4" component="h2" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable rows={payments.nodes} />
    </Layout>
  )
}
