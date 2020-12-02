import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PaymentsTable from "../components/paymentsTable"

export const beneficiaryQuery = graphql`
  query beneficiaryPayments($paymentsLookup: String!, $countryLookup: String!) {
    payments: allPaymentsJson(filter: { beneficiary_id: { eq: $paymentsLookup } }) {
      nodes {
        id
        programme
        purpose
        amount
        summary
        startDate
        endDate
      }
    }
    country: countriesJson(iso: {eq: $countryLookup}) {
      iso
      name
    }
  }
`

export default function BeneficiaryTemplate({
  pageContext: { node, paymentsLookup, countryLookup, route, title },
  data: { payments, country },
}) {
  return (
    <Layout route={route} title={title}>
      <h1>{node.name}</h1>
      {node.schema}
      <br />
      Country: {country.name}
      <h2>Funding</h2>
      <strong>Total money received: {node.total_amount} €</strong>
      <PaymentsTable rows={payments.nodes} exclude={["beneficiary_name"]} />
    </Layout>
  )
}
