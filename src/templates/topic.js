import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ProjectsTable from "../components/projectsTable"
import AttributeCard from "../components/attributeCard"
import AmountCard from "../components/amountCard"
import TopicHierarchyCard from "../components/topicHierarchyCard"
import { TopicSchema } from "../schema"

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
  } = node
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {TopicSchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard color={TopicSchema.color} {...node} />
        <AttributeCard
          data={{
            beneficiaries_count,
            projects_count,
            programmes_count,
          }}
        />
        <TopicHierarchyCard
          ancestor={ancestor}
          descendants={descendants.nodes}
          root={node.key}
        />
      </OverviewGrid>
      <Typography variant="h4" component="h2" gutterBottom>
        Projects
      </Typography>
      <ProjectsTable rows={projects.nodes} />
    </Layout>
  )
}
