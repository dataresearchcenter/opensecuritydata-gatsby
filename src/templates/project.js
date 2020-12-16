import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby-theme-material-ui"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import Tabs from "../components/tabs"
import ProgrammeCard from "../components/programmeCard"
import DataCard from "../components/dataCard"
import PaymentsTable from "../components/paymentsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Translated from "../components/translation"
import { cast } from "../components/viz"
import Amount from "../components/amount"
import { ProjectSchema } from "../schema"
import { getTopicLink } from "../links"

export const projectQuery = graphql`
  query projectQuery(
    $projectLookup: String!
    $programmeLookup: String!
    $topicsLookup: [String!]
    $proofLookup: String!
  ) {
    payments: allPaymentsJson(filter: { purpose: { eq: $projectLookup } }) {
      nodes {
        id
        beneficiary_name
        amount
        startDate
        endDate
        summary
        legalForm
        country
      }
    }
    programme: programmesJson(name: { eq: $programmeLookup }) {
      id
      name
      projects
      beneficiaries
      payments
      total_amount
    }
    topics: allTopicsJson(filter: { key: { in: $topicsLookup } }) {
      nodes {
        key
        name
      }
    }
    proof: documentsJson(id: { eq: $proofLookup }) {
      id
      fileName
      fileSize
    }
  }
`

const useStyles = makeStyles(theme => ({
  moreCard: {
    marginTop: theme.spacing(4),
  },
  topic: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const ProjectTitle = ({ name, name_en, language }) => {
  if (language) {
    return (
      <Typography variant="h3">
        <Translated original={name} translated={name_en} language={language} />
        {ProjectSchema.chip()}
      </Typography>
    )
  }
  if (name.indexOf(" - ") > 0) {
    const [mainname, ...subname] = name.split(" - ")
    return (
      <>
        <Typography variant="h3">
          {mainname} {ProjectSchema.chip()}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {subname.join(" - ")}
        </Typography>
      </>
    )
  } else {
    return (
      <Typography variant="h3" gutterBottom>
        {name} {ProjectSchema.chip()}
      </Typography>
    )
  }
}

export default function ProjectTemplate({
  pageContext: {
    node,
    projectLookup,
    programmeLookup,
    topicsLookup,
    proofLookup,
    route,
    title,
  },
  data: { payments, programme, topics, proof },
}) {
  const classes = useStyles()
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
    <Layout route={route} title={title.split("-")[0].trim()}>
      <ProjectTitle {...node} />
      <Tabs
        indicatorColor={ProjectSchema.color}
        textColor={ProjectSchema.color}
      >
        <section title="Overview">
          <OverviewGrid>
            <AmountCard
              color={ProjectSchema.color}
              vizData={vizData}
              {...node}
            />
            <div>
              <AttributeCard
                hideTitle
                data={{
                  beneficiaries: node.beneficiaries,
                  project_start: node.startDate,
                  project_end: node.endDate,
                }}
              />
              <div className={classes.moreCard}>
                <ProgrammeCard data={programme} />
              </div>
            </div>
            <DataCard sourceUrl={node.sourceUrl} {...proof} />
          </OverviewGrid>
          {node.description?.length > 0 && (
            <>
              <Typography variant="h4" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" gutterBottom>
                {node.language ? (
                  <Translated
                    language={node.language}
                    translated={node.description_en}
                    original={node.description}
                  />
                ) : (
                  node.description
                )}
              </Typography>
            </>
          )}
          {topics.nodes.map(({ name, key }) => (
            <Chip
              variant="outlined"
              className={classes.topic}
              key={key}
              label={name}
              component={Link}
              to={getTopicLink({ key })}
              clickable
            />
          ))}
        </section>
        <PaymentsTable
          title="Funding"
          rows={payments.nodes}
          exclude={["programme", "purpose"]}
        />
      </Tabs>
    </Layout>
  )
}
