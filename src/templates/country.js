import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import PaymentsTable from "../components/paymentsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Flag from "../components/flag"
import { CountrySchema } from "../schema"
import Viz, { VizCard } from "../components/viz"

export const query = graphql`
  query countryQuery($lookup: String!) {
    payments: allPaymentsJson(filter: { country: { eq: $lookup } }) {
      nodes {
        id
        beneficiaryName
        notes
        amount
        startDate
        endDate
        purpose
        program
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
      <Flag iso={node.iso} />
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {CountrySchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard
          color={CountrySchema.color}
          viz={<Viz use="fundingPerProgram" data={payments.nodes} />}
          {...node}
        />
        <AttributeCard data={attributeData} />
        <VizCard use="fundingPerYear" data={payments.nodes} />
      </OverviewGrid>
      <Typography variant="h4" component="h2" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable rows={payments.nodes} exclude={["country"]} />
    </Layout>
  )
}
