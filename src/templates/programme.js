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
import { cast } from "../components/viz"
import Amount from "../components/amount"
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
        total_amount
        startDate
        endDate
      }
    }
    payments: allPaymentsJson(filter: { programme: { eq: $projectsLookup } }) {
      nodes {
        id
        beneficiary_name
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
  const vizData = {
    title: "Funding per country",
    data: [...new Set(payments.nodes.map(({ country }) => country))]
      .map(p => ({
        label: p.split(" - ")[0].substring(0, 20),
        value: payments.nodes
          .filter(({ country }) => p === country)
          .reduce((sum, { amount }) => sum + cast(amount), 0),
      }))
      .map(d => ({ ...d, valueLabel: <Amount value={d.value} /> })),
  }
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" gutterBottom>
        {node.name} {ProgrammeSchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard color={ProgrammeSchema.color} vizData={vizData} {...node} />
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
          exclude={["programme", "startDate", "endDate"]}
        />
      </Tabs>
    </Layout>
  )
}
