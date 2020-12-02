import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PaymentsTable from "../components/paymentsTable"

export const countryQuery = graphql`
  query countryQuery($lookup: String!) {
    payments: allPaymentsJson(filter: { beneficiary_country: { eq: $lookup } }) {
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
  return (
    <Layout route={route} title={title}>
      <h1>{node.name}</h1>
      <strong>Total funding: {node.total_amount} €</strong>
      <h2>Payments</h2>
      <PaymentsTable rows={payments.nodes} />
    </Layout>
  )
}
