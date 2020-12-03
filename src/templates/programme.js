import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProgrammeCard from "../components/programmeCard"
import ProjectsTable from "../components/projectsTable"

export const programmeQuery = graphql`
  query programmeProjects($projectsLookup: String!, $proofLookup: String!) {
    projects: allProjectsJson(filter: { programme: { eq: $projectsLookup } }) {
      nodes {
        id
        name
        programme
        beneficiaries
        payments
        total_amount
      }
    }
    proof: documentsJson(id: { eq: $proofLookup }) {
      id
      fileName
      fileSize
    }
  }
`

export default function ProgrammeTemplate({
  pageContext: { node, projectsLookup, proofLookup, route, title },
  data: { projects, proof },
}) {
  return (
    <Layout route={route} title={title}>
      <h1>{node.name}</h1>
      <ProgrammeCard
        data={node}
        showName={false}
        showLink={false}
        showHeader={false}
      />
      <h2>Projects</h2>
      <ProjectsTable
        rows={projects.nodes}
        exclude={["programme"]}
        proof={proof}
      />
    </Layout>
  )
}
