import React from "react"
import { graphql } from "gatsby"
import Chip from "@material-ui/core/Chip"
import { Link } from "gatsby-theme-material-ui"
import Layout from "../components/layout"
import ProgrammeCard from "../components/programmeCard"
import PaymentsTable from "../components/paymentsTable"
import { pathSlugify } from "../util"

export const projectQuery = graphql`
  query projectQuery(
    $projectLookup: String!
    $programmeLookup: String!
    $topicsLookup: [String!]
    $proofLookup: String!
  ) {
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
    topics: allTopicsJson(filter: { key: { in: $topicsLookup } }) {
      nodes {
        key
        name
      }
    }
    proof: documentsJson(id: { eq: $proofLookup }) {
      id
      fileName
      fileSize
    }
  }
`

export default function ProjectTemplate({
  pageContext: {
    node,
    projectLookup,
    programmeLookup,
    topicsLookup,
    proofLookup,
    route,
    title,
  },
  data: { payments, programme, topics, proof },
}) {
  return (
    <Layout route={route} title={title.split("-")[0].trim()}>
      <h1>{node.name}</h1>
      <strong>Total funding: {node.total_amount} €</strong>
      <h2>Topics</h2>
      {topics.nodes.map(({ name, key }) => (
        <Chip
          key={key}
          label={name}
          component={Link}
          to={`/topics/${pathSlugify(key)}`}
          clickable
        />
      ))}
      <p>{node.description}</p>
      <ProgrammeCard data={programme} />
      <h2>Payments</h2>
      <PaymentsTable
        rows={payments.nodes}
        exclude={["programme", "purpose"]}
        proof={proof}
      />
    </Layout>
  )
}
