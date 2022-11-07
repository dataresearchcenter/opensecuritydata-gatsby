import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby-theme-material-ui"
import styled from "@emotion/styled"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import Tabs from "../components/tabs"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import ProgramCard from "../components/programCard"
import ProjectsTable from "../components/projectsTable"
import ParticipationsTable from "../components/participationsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import CardsWrapper from "../components/cardsWrapper"
import Viz, { VizCard } from "../components/viz"
import DataCard from "../components/dataCard"
import { ProgramSchema } from "../schema"

const ProgramHeader = styled(Paper)`
  padding: 20px;
  margin-bottom: 50px;
  background-color: ${({ scope }) =>
    scope === "military" ? "#f3e5f5" : "#e3f2fd"};
`

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
    participations: allParticipationsJson(
      filter: { program: { eq: $lookup } }
    ) {
      nodes {
        ...ParticipationFragment
      }
    }
    meta: programMetaJson(name: { eq: $lookup }) {
      title
      description
      scope
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
  const edidp = node.name === "EDIDP"
  return (
    <Layout route={route} title={title}>
      <ProgramHeader elevation={0} scope={meta.scope}>
        <Typography variant="h3" component="h1" gutterBottom>
          {meta.title} {ProgramSchema.chip()} <Chip label={meta.scope} />
        </Typography>
        <Typography component="p">{meta.description}</Typography>
        <Link to={meta.url}>More information on the EU website</Link>
      </ProgramHeader>
      <OverviewGrid>
        <AmountCard
          color={ProgramSchema.color}
          viz={<Viz use="fundingPerCountry" data={participations.nodes} />}
          {...node}
        />
        {edidp ? (
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Data
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Detailed data on specific payments for individual beneficiaries
                not available for this funding program.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <VizCard use="fundingPerYear" data={participations.nodes} />
        )}
        <DataCard {...node} />
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
