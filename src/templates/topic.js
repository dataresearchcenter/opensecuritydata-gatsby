import React from "react"
import { graphql } from "gatsby"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { Button } from "gatsby-theme-material-ui"
import Layout from "../components/layout"
import ProjectsTable from "../components/projectsTable"
import TopicTree from "../components/topicTree"
import { pathSlugify } from "../util"

export const topicQuery = graphql`
  query topicContext(
    $ancestorLookup: String!
    $descendantsLookup: String!
    $projectsLookup: String!
  ) {
    ancestor: topicsJson(key: { eq: $ancestorLookup }) {
      key
      name
    }
    descendants: allTopicsJson(
      filter: { ancestor: { regex: $descendantsLookup } }
    ) {
      nodes {
        key
        name
        ancestor
        descendants
      }
    }
    projects: allProjectsJson(filter: { summary: { regex: $projectsLookup } }) {
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

export default function ProgrammeTemplate({
  pageContext: {
    node,
    ancestorLookup,
    descendantsLookup,
    projectsLookup,
    route,
    title,
  },
  data: { ancestor, descendants, projects },
}) {
  return (
    <Layout route={route} title={title}>
      <h1>{node.name}</h1>
      {ancestor ? (
        <>
          <h2>Parent topic</h2>
          <Button
            to={`/topic/${pathSlugify(ancestor.key)}`}
            startIcon={<ChevronLeftIcon />}
          >
            {ancestor.name}
          </Button>
        </>
      ) : (
        <Button to="/topics" startIcon={<ChevronLeftIcon />}>
          Back to all topics
        </Button>
      )}
      {descendants.nodes.length > 0 && (
        <>
          <h2>sub topics</h2>
          <TopicTree topics={descendants.nodes} root={node.key} />
        </>
      )}
      <h1>Projects</h1>
      <ProjectsTable rows={projects.nodes} />
    </Layout>
  )
}
