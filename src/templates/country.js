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
import { cast } from "../components/viz"
import Amount from "../components/amount"

export const countryQuery = graphql`
  query countryQuery($lookup: String!) {
    payments: allPaymentsJson(filter: { country: { eq: $lookup } }) {
      nodes {
        id
        beneficiary_name
        amount
        startDate
        endDate
        summary
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
  const vizData = {
    title: "Funding per programme",
    data: [...new Set(payments.nodes.map(({ programme }) => programme))]
      .map(p => ({
        label: p,
        value: payments.nodes
          .filter(({ programme }) => p === programme)
          .reduce((sum, { amount }) => sum + cast(amount), 0),
      }))
      .map(d => ({ ...d, valueLabel: <Amount value={d.value} /> })),
  }
  return (
    <Layout route={route} title={title}>
      <Flag iso={node.iso} />
      <Typography variant="h3" gutterBottom>
        {node.name} {CountrySchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard color={CountrySchema.color} vizData={vizData} {...node} />
        <AttributeCard data={attributeData} />
      </OverviewGrid>
      <Typography variant="h4" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable rows={payments.nodes} exclude={["country"]} />
    </Layout>
  )
}
