import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import styled from "@emotion/styled"
import Paper from "@material-ui/core/Paper"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby-theme-material-ui"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ProgramCard from "../components/programCard"
import DataCard from "../components/dataCard"
import ParticipationsTable from "../components/participationsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Translated from "../components/translation"
import Viz from "../components/viz"
import CallCard from "../components/callCard.js"
import CardsWrapper from "../components/cardsWrapper"
import { ProjectSchema } from "../schema"
import { getTagLink, getProgramLink } from "../links"

const ProjectBlock = styled(Paper)`
  padding: 20px;
  margin-bottom: 50px;
  background-color: ${({ scope }) =>
    scope === "military" ? "#f3e5f5" : "#e3f2fd"};
`

export const query = graphql`
  query projectQuery(
    $foreignId: String!
    $projectLookup: String!
    $programLookup: String!
  ) {
    participations: allParticipationsJson(
      filter: { project: { eq: $projectLookup } }
    ) {
      nodes {
        ...ParticipationFragment
      }
    }
    program: programsJson(name: { eq: $programLookup }) {
      name
      projects
      beneficiaries
      amount
    }
    programMeta: programMetaJson(name: { eq: $programLookup }) {
      description
      scope
      dataDescription
      fileName
      fileSize
      url
    }
    translations: allTranslationsJson(filter: { entity: { eq: $foreignId } }) {
      nodes {
        ...TranslationFragment
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  section: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  description: {
    paddingTop: theme.spacing(2),
  },
  taxonomy: {
    marginTop: theme.spacing(4),
  },
  taxonomyChip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const ProjectTitle = ({ name, translations, scope }) => {
  if (!!translations) {
    return (
      <Typography variant="h3" component="h1">
        <Translated
          original={name}
          translations={translations}
          identifier="title"
        />
        {ProjectSchema.chip()}
        <Chip label={scope} />
      </Typography>
    )
  }
  if (name.indexOf(" - ") > 0) {
    const [mainname, ...subname] = name.split(" - ")
    return (
      <>
        <Typography variant="h3" component="h1">
          {mainname} {ProjectSchema.chip()}
          <Chip label={scope} />
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {subname.join(" - ")}
        </Typography>
      </>
    )
  } else {
    return (
      <Typography variant="h3" component="h1" gutterBottom>
        {name} {ProjectSchema.chip()}
        <Chip label={scope} />
      </Typography>
    )
  }
}

export default function ProjectTemplate({
  pageContext: { node, foreignId, projectLookup, programLookup, route, title },
  data: { participations, program, programMeta, translations },
}) {
  const classes = useStyles()
  const isf = program.name === "Internal Security Fund"
  const tags = JSON.parse(node.tags || "[]")
  const hasCallCard = node.topicName || node.callName
  const scope = programMeta.scope

  return (
    <Layout route={route} title={title.split("-")[0].trim()}>
      <ProjectBlock scope={scope}>
        <ProjectTitle
          name={node.name}
          translations={translations.nodes}
          scope={scope}
        />
        <Typography component="p">
          <strong>{node.name}</strong> is a project funded under the program{" "}
          <Link to={getProgramLink({ name: node.program })}>
            {node.program}
          </Link>{" "}
          which is part of the <strong>{programMeta.scope}</strong> funding from
          the EU.
        </Typography>
      </ProjectBlock>
      {node.description?.length > 0 && (
        <ProjectBlock scope={scope}>
          <Typography variant="h5" component="h4" gutterBottom>
            Description
          </Typography>
          <Typography component="div" variant="body1">
            {translations.nodes ? (
              <Translated
                original={node.description}
                translations={translations.nodes}
              />
            ) : (
              node.description
            )}
          </Typography>
        </ProjectBlock>
      )}
      {tags.length > 0 && (
        <section className={classes.taxonomy}>
          <Typography variant="h5" component="h4" gutterBottom>
            Tags
          </Typography>
          {tags.map(c => (
            <Chip
              key={c}
              className={classes.taxonomyChip}
              color="primary"
              label={c}
              component={Link}
              to={getTagLink({ name: c })}
              clickable
            />
          ))}
        </section>
      )}
      <section className={classes.section}>
        <OverviewGrid>
          <AmountCard
            color={ProjectSchema.color}
            viz={<Viz use="fundingPerCountry" data={participations.nodes} />}
            hideCaption
            {...node}
          />

          <AttributeCard
            data={{
              beneficiaries: node.beneficiaries,
              project_start: node.startDate,
              project_end: node.endDate,
            }}
          />

          <CardsWrapper>
            <DataCard
              sourceUrl={!hasCallCard && node.sourceUrl}
              {...programMeta}
            />
            {hasCallCard && <CallCard color={ProjectSchema.color} {...node} />}
          </CardsWrapper>
        </OverviewGrid>
      </section>
      <section className={classes.section}>
        <Typography variant="h4" component="h3" gutterBottom>
          Funding
        </Typography>
        <ParticipationsTable
          title="Funding"
          rows={participations.nodes}
          exclude={["program", "project", isf ? "legalForm" : null]}
        />
      </section>
    </Layout>
  )
}
