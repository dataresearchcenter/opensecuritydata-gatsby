import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import Tabs from "../components/tabs"
import ProgrammeCard from "../components/programmeCard"
import ProjectsTable from "../components/projectsTable"
import PaymentsTable from "../components/paymentsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Viz from "../components/viz"
import { ProgrammeSchema } from "../schema"

export const programmeQuery = graphql`
  query programmeProjects($projectsLookup: String!, $proofLookup: String!) {
    projects: allProjectsJson(filter: { programme: { eq: $projectsLookup } }) {
      nodes {
        id
        name
        programme
        beneficiaries
        payments
        amount
        startDate
        endDate
      }
    }
    payments: allPaymentsJson(filter: { programme: { eq: $projectsLookup } }) {
      nodes {
        id
        beneficiaryName
        notes
        purpose
        programme
        amount
        startDate
        endDate
        legalForm
        country
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
  data: { payments, projects, proof },
}) {
  const isf = node.name === "Internal Security Fund"
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {ProgrammeSchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard
          color={ProgrammeSchema.color}
          viz={<Viz use="fundingPerCountry" data={payments.nodes} />}
          {...node}
        />
        <ProgrammeCard
          data={{ ...node, proof }}
          showName={false}
          showLink={false}
          showData={false}
        />
        <AttributeCard
          data={{
            projects: node.projects,
            beneficiaries: node.beneficiaries,
            activity_start: node.startDate,
            activity_end: node.endDate,
          }}
        />
      </OverviewGrid>
      <Tabs
        indicatorColor={ProgrammeSchema.color}
        textColor={ProgrammeSchema.color}
        centered
      >
        <ProjectsTable
          title="Projects"
          rows={projects.nodes}
          exclude={["programme"]}
        />
        <PaymentsTable
          title="Beneficiaries"
          rows={payments.nodes}
          exclude={[
            "programme",
            "startDate",
            "endDate",
            isf ? "legalForm" : null,
          ]}
        />
      </Tabs>
    </Layout>
  )
}
