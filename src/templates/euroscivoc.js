import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ProjectsTable from "../components/projectsTable"
import AttributeCard from "../components/attributeCard"
import AmountCard from "../components/amountCard"
import EuroSciVocHierarchyCard from "../components/euroscivocHierarchyCard"
import { EuroSciVocSchema } from "../schema"
import { VizCard } from "../components/viz"

export const query = graphql`
  query euroscivocQuery(
    $ancestorLookup: String!
    $descendantsLookup: String!
    $projectsLookup: String!
  ) {
    ancestor: euroscivocJson(key: { eq: $ancestorLookup }) {
      key
      name
    }
    descendants: allEuroscivocJson(
      filter: { ancestor: { regex: $descendantsLookup } }
    ) {
      nodes {
        key
        name
        ancestor
        descendants
      }
    }
    projects: allProjectsJson(
      filter: { euroscivoc: { regex: $projectsLookup } }
    ) {
      nodes {
        id
        name
        program
        beneficiaries
        amount
        payments
        startDate
        endDate
      }
    }
  }
`

export default function EuroSciVocTemplate({
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
    programs: programs_count,
  } = node
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {EuroSciVocSchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard color={EuroSciVocSchema.color} {...node} />
        <AttributeCard
          data={{
            beneficiaries_count,
            projects_count,
            programs_count,
          }}
        />
        <>
          <VizCard use="fundingPerYear" data={projects.nodes} />
          <EuroSciVocHierarchyCard
            ancestor={ancestor}
            descendants={descendants.nodes}
            root={node.key}
          />
        </>
      </OverviewGrid>
      <Typography variant="h4" component="h2" gutterBottom>
        Projects
      </Typography>
      <ProjectsTable rows={projects.nodes} />
    </Layout>
  )
}
