import React from "react"
import { graphql } from "gatsby"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { Button } from "gatsby-theme-material-ui"
import Layout from "../components/layout"
import ProjectsTable from "../components/projectsTable"
import TopicTree from "../components/topicTree"
import AttributeTable from "../components/attributeTable"
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
  const {
    beneficiaries: beneficiaries_count,
    projects: projects_count,
    programmes: programmes_count,
    total_amount,
  } = node
  return (
    <Layout route={route} title={title}>
      <h1>{node.name}</h1>
      <h3>
        Stats for this topic
        {descendants?.nodes.length > 0
          ? ` and all its ${descendants.nodes.length} subtopics`
          : null}
      </h3>
      <AttributeTable
        data={{
          beneficiaries_count,
          projects_count,
          programmes_count,
          total_amount,
        }}
      />
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
