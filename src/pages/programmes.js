import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProgrammeCard from "../components/programmeCard"

export const query = graphql`
  query ProgrammesQuery {
    programmes: allProgrammesJson {
      nodes {
        name
        projects
        beneficiaries
        amount
        id
      }
    }
  }
`

const ProgrammesPage = ({ data: { programmes } }) => (
  <Layout route="All funding programmes">
    <h1>Funding programmes</h1>
    {programmes.nodes.map(p => (
      <ProgrammeCard key={p.id} data={p} />
    ))}
  </Layout>
)

export default ProgrammesPage
