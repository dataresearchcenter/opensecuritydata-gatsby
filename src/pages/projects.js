import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProjectsTable from "../components/projectsTable"

export const query = graphql`
  query ProjectsQuery {
    allProjectsJson {
      nodes {
        beneficiaries
        programme
        purpose
        id
        total_amount
        payments
      }
    }
  }
`

const ProjectsPage = ({ data }) => (
  <Layout>
    <h1>All projects</h1>
    <ProjectsTable rows={data.allProjectsJson.nodes} />
  </Layout>
)

export default ProjectsPage
