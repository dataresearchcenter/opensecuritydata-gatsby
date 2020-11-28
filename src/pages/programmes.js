import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProgrammeCard from "../components/programmeCard"

export const query = graphql`
  query ProgrammesQuery {
    allProgrammesJson {
      nodes {
        programme
        projects
        beneficiaries
        total_amount
        id
      }
    }
  }
`

const ProgrammesPage = ({ data }) => (
  <Layout route="All funding programmes">
    <h1>Funding programmes</h1>
    {data.allProgrammesJson.nodes.map(p => (
      <ProgrammeCard key={p.id} data={p} />
    ))}
  </Layout>
)

export default ProgrammesPage
