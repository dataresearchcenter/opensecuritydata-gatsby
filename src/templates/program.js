import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import Tabs from "../components/tabs"
import ProgramCard from "../components/programCard"
import ProjectsTable from "../components/projectsTable"
import ParticipationsTable from "../components/participationsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import CardsWrapper from "../components/cardsWrapper"
import Viz, { VizCard } from "../components/viz"
import { ProgramSchema } from "../schema"

export const programQuery = graphql`
  query programProjects($lookup: String!) {
    projects: allProjectsJson(filter: { program: { eq: $lookup } }) {
      nodes {
        id
        name
        program
        beneficiaries
        amount
        startDate
        endDate
        callName
        workProgram
      }
    }
    participations: allParticipationsJson(filter: { program: { eq: $lookup } }) {
      nodes {
        ...ParticipationFragment
      }
    }
    meta: programMetaJson(name: { eq: $lookup }) {
      description
      fileName
      fileSize
      url
    }
  }
`

export default function ProgramTemplate({
  pageContext: { node, lookup, route, title },
  data: { participations, projects, meta },
}) {
  const isf = node.name === "Internal Security Fund"
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" component="h1" gutterBottom>
        {node.name} {ProgramSchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard
          color={ProgramSchema.color}
          viz={<Viz use="fundingPerCountry" data={participations.nodes} />}
          {...node}
        />
        <CardsWrapper>
          <ProgramCard
            showName={false}
            showData={false}
            {...node}
            {...meta}
          />
          <AttributeCard
            data={{
              projects: node.projects,
              beneficiaries: node.beneficiaries,
              activity_start: node.startDate,
              activity_end: node.endDate,
            }}
          />
        </CardsWrapper>
        <VizCard use="fundingPerYear" data={participations.nodes} />
      </OverviewGrid>
      <Tabs
        indicatorColor={ProgramSchema.color}
        textColor={ProgramSchema.color}
        centered
      >
        <ProjectsTable
          title="Projects"
          rows={projects.nodes}
          exclude={["program"]}
        />
        <ParticipationsTable
          title="Beneficiaries"
          rows={participations.nodes}
          exclude={[
            "program",
            "startDate",
            "endDate",
            isf ? "legalForm" : null,
          ]}
        />
      </Tabs>
    </Layout>
  )
}
