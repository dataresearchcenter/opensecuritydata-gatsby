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
  topic: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const ProjectTitle = ({ title }) => {
  if (title.indexOf(" - ") > 0) {
    const [maintitle, ...subtitle] = title.split(" - ")
    return (
      <>
        <Typography variant="h3">
          {maintitle} {ProjectSchema.chip}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {subtitle.join(" - ")}
        </Typography>
      </>
    )
  } else {
    return (
      <Typography variant="h3" gutterBottom>
        {title} {ProjectSchema.chip}
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
  return (
    <Layout route={route} title={title.split("-")[0].trim()}>
      <ProjectTitle title={node.name} />
      <Tabs
        indicatorColor={ProjectSchema.color}
        textColor={ProjectSchema.color}
      >
        <section title="Overview">
          <OverviewGrid>
            <div>
              <AmountCard color={ProjectSchema.color} {...node} />
              <AttributeCard
                hideTitle
                data={{
                  beneficiaries: node.beneficiaries,
                  project_start: node.startDate,
                  project_end: node.endDate,
                }}
              />
            </div>
            <ProgrammeCard data={programme} />
            <DataCard sourceUrl="https://cordis.europa.eu/" {...proof} />
          </OverviewGrid>
          {node.description?.length > 0 && (
            <>
              <Typography variant="h4" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" gutterBottom>
                {node.description}
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
