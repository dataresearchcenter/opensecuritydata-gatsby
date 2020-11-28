import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PaymentsTable from "../components/paymentsTable"

export const beneficiaryQuery = graphql`
  query beneficiaryPayments($lookup: String!) {
    payments: allPaymentsJson(filter: { beneficiary_id: { eq: $lookup } }) {
      nodes {
        id
        programme
        purpose
        amount
        startDate
        endDate
        summary
      }
    }
  }
`

export default function BeneficiaryTemplate({
  pageContext: { node, lookup, route, title },
  data: { payments },
}) {
  return (
    <Layout route={route} title={title}>
      <h1>{node.beneficiary_name}</h1>
      {node.schema}
      <h2>Funding</h2>
      <strong>Total money received: {node.total_amount} €</strong>
      <PaymentsTable rows={payments.nodes} exclude={["beneficiary_name"]} />
    </Layout>
  )
}
