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
  }
`

export default function ProjectTemplate({
  pageContext: {
    node,
    projectLookup,
    programmeLookup,
    topicsLookup,
    route,
    title,
  },
  data: { payments, programme, topics },
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
          to={`/topic/${pathSlugify(key)}`}
          clickable
        />
      ))}
      <p>{node.description}</p>
      <ProgrammeCard data={programme} />
      <h2>Payments</h2>
      <PaymentsTable rows={payments.nodes} exclude={["programme", "purpose"]} />
    </Layout>
  )
}
