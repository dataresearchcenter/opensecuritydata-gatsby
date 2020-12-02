import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProjectsTable from "../components/projectsTable"

export const query = graphql`
  query ProjectsQuery {
    projects: allProjectsJson {
      nodes {
        id
        name
        programme
        beneficiaries
        total_amount
        payments
      }
    }
  }
`

const ProjectsPage = ({ data: { projects } }) => (
  <Layout>
    <h1>All projects</h1>
    <ProjectsTable rows={projects.nodes} />
  </Layout>
)

export default ProjectsPage
