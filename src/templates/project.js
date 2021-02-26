import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Chip from "@material-ui/core/Chip"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby-theme-material-ui"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ProgrammeCard from "../components/programmeCard"
import DataCard from "../components/dataCard"
import PaymentsTable from "../components/paymentsTable"
import AmountCard from "../components/amountCard"
import AttributeCard from "../components/attributeCard"
import Translated from "../components/translation"
import Viz from "../components/viz"
import { ProjectSchema } from "../schema"
import { getTopicLink, getEuroSciVocLink, getCategoryLink } from "../links"

export const query = graphql`
  query projectQuery(
    $projectLookup: String!
    $programmeLookup: String!
    $topicLookup: String!
    $euroscivocLookup: [String!]
    $proofLookup: String!
    $translationsLookup: [String!]
  ) {
    payments: allPaymentsJson(filter: { purpose: { eq: $projectLookup } }) {
      nodes {
        id
        beneficiaryName
        notes
        amount
        startDate
        endDate
        legalForm
        country
      }
    }
    programme: programmesJson(name: { eq: $programmeLookup }) {
      name
      projects
      beneficiaries
      payments
      amount
    }
    programmeDescription: programmeDescriptionsJson(
      name: { eq: $programmeLookup }
    ) {
      description
      url
    }
    euroscivoc: allEuroscivocJson(filter: { key: { in: $euroscivocLookup } }) {
      nodes {
        key
        name
      }
    }
    topic: topicsJson(name: { eq: $topicLookup }) {
      name
    }
    proof: documentsJson(id: { eq: $proofLookup }) {
      fileName
      fileSize
    }
    translations: allTranslationsJson(
      filter: { key: { in: $translationsLookup } }
    ) {
      nodes {
        language
        key
        value
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
    padding: theme.spacing(2),
  },
  moreCard: {
    marginTop: theme.spacing(4),
  },
  taxonomy: {
    marginTop: theme.spacing(4),
  },
  taxonomyChip: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const ProjectTitle = ({ name, translations }) => {
  if (!!translations) {
    return (
      <Typography variant="h3" component="h1">
        <Translated original={name} translations={translations} />
        {ProjectSchema.chip()}
      </Typography>
    )
  }
  if (name.indexOf(" - ") > 0) {
    const [mainname, ...subname] = name.split(" - ")
    return (
      <>
        <Typography variant="h3" component="h1">
          {mainname} {ProjectSchema.chip()}
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
      </Typography>
    )
  }
}

export default function ProjectTemplate({
  pageContext: {
    node,
    projectLookup,
    programmeLookup,
    topicLookup,
    euroscivocLookup,
    proofLookup,
    translationsLookup,
    route,
    title,
  },
  data: {
    payments,
    programme,
    programmeDescription,
    topic,
    proof,
    euroscivoc,
    translations,
  },
}) {
  const classes = useStyles()
  const isf = programme.name === "Internal Security Fund"
  const categories = JSON.parse(node.categories || "[]")
  return (
    <Layout route={route} title={title.split("-")[0].trim()}>
      <ProjectTitle name={node.name} translations={translations.nodes} />
      <section className={classes.section}>
        <Typography variant="h4" component="h3" gutterBottom>
          Overview
        </Typography>
        <OverviewGrid>
          <AmountCard
            color={ProjectSchema.color}
            viz={<Viz use="fundingPerCountry" data={payments.nodes} />}
            hideCaption
            {...node}
          />
          <div>
            <AttributeCard
              data={{
                beneficiaries: node.beneficiaries,
                project_start: node.startDate,
                project_end: node.endDate,
              }}
            />
            <div className={classes.moreCard}>
              <ProgrammeCard data={programme} texts={programmeDescription} />
            </div>
          </div>
          <DataCard sourceUrl={node.sourceUrl} {...proof} />
        </OverviewGrid>
        {node.description?.length > 0 && (
          <>
            <Typography variant="h5" component="h4" gutterBottom>
              Description
            </Typography>
            <Paper className={classes.description}>
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
            </Paper>
          </>
        )}
        {categories.length > 0 && (
          <section className={classes.taxonomy}>
            <Typography variant="h5" component="h4" gutterBottom>
              Categories
            </Typography>
            {categories.map(c => (
              <Chip
                key={c}
                className={classes.taxonomyChip}
                color="primary"
                label={c}
                component={Link}
                to={getCategoryLink({ name: c })}
                clickable
              />
            ))}
          </section>
        )}
        {topic && (
          <section className={classes.taxonomy}>
            <Typography variant="h5" component="h4" gutterBottom>
              Topic
            </Typography>
            <Chip
              className={classes.taxonomyChip}
              color="primary"
              label={topic.name}
              component={Link}
              to={getTopicLink(topic)}
              clickable
            />
          </section>
        )}
        {euroscivoc.nodes.length > 1 && (
          <section className={classes.taxonomy}>
            <Typography variant="h5" component="h4" gutterBottom>
              EuroSciVoc hierarchy
            </Typography>
            {euroscivoc.nodes.map(({ name, key }) => (
              <Chip
                variant="outlined"
                className={classes.taxonomyChip}
                key={key}
                label={name}
                component={Link}
                to={getEuroSciVocLink({ key })}
                clickable
              />
            ))}
          </section>
        )}
      </section>
      <section className={classes.section}>
        <Typography variant="h4" component="h3" gutterBottom>
          Funding
        </Typography>
        <PaymentsTable
          title="Funding"
          rows={payments.nodes}
          exclude={["programme", "purpose", isf ? "legalForm" : null]}
        />
      </section>
    </Layout>
  )
}
