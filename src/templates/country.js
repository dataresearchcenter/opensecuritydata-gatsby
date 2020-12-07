import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import PaymentsTable from "../components/paymentsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import { CountrySchema } from "../schema"

export const countryQuery = graphql`
  query countryQuery($lookup: String!) {
    payments: allPaymentsJson(
      filter: { beneficiary_country: { eq: $lookup } }
    ) {
      nodes {
        id
        beneficiary_name
        amount
        startDate
        endDate
        summary
        purpose
        programme
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
  }
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" gutterBottom>
        {node.name} {CountrySchema.chip}
      </Typography>
      <OverviewGrid>
        <AmountCard color={CountrySchema.color} {...node} />
        <AttributeCard data={attributeData} />
      </OverviewGrid>
      <Typography variant="h4" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable rows={payments.nodes} />
    </Layout>
  )
}
