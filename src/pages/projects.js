import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import ProjectsTable from "../components/projectsTable"

export const query = graphql`
  query ProjectsQuery {
    projects: allProjectsJson {
      nodes {
        id
        name
        program
        beneficiaries
        amount
        payments
        callName
        workProgram
      }
    }
  }
`

const ProjectsPage = ({ data: { projects } }) => (
  <Layout route="Projects">
    <Typography variant="h3">All projects</Typography>
    <ProjectsTable rows={projects.nodes} />
  </Layout>
)

export default ProjectsPage
