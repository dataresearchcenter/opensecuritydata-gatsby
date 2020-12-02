import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProgrammeCard from "../components/programmeCard"
import PaymentsTable from "../components/paymentsTable"

export const projectQuery = graphql`
  query projectQuery($projectLookup: String!, $programmeLookup: String!) {
    payments: allPaymentsJson(filter: { purpose: { eq: $projectLookup } }) {
      nodes {
        id
        beneficiary_name
        amount
        startDate
        endDate
        summary
      }
    }
    programme: programmesJson(name: { eq: $programmeLookup }) {
      id
      name
      projects
      beneficiaries
      payments
      total_amount
    }
  }
`

export default function ProjectTemplate({
  pageContext: { node, projectLookup, programmeLookup, route, title },
  data: { payments, programme },
}) {
  return (
    <Layout route={route} title={title.split('-')[0].trim()}>
      <h1>{node.name}</h1>
      <strong>Total funding: {node.total_amount} €</strong>
      <p>{node.description}</p>
      <ProgrammeCard data={programme} />
      <h2>Payments</h2>
      <PaymentsTable rows={payments.nodes} exclude={["programme", "purpose"]} />
    </Layout>
  )
}
