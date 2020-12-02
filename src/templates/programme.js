import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProgrammeCard from "../components/programmeCard"
import ProjectsTable from "../components/projectsTable"

export const programmeQuery = graphql`
  query programmeProjects($lookup: String!) {
    projects: allProjectsJson(filter: { programme: { eq: $lookup } }) {
      nodes {
        id
        name
        programme
        beneficiaries
        payments
        total_amount
      }
    }
  }
`

export default function ProgrammeTemplate({
  pageContext: { node, lookup, route, title },
  data: { projects },
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
      <ProjectsTable rows={projects.nodes} exclude={["programme"]} />
    </Layout>
  )
}
