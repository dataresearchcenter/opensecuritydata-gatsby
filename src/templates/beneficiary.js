import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import PaymentsTable from "../components/paymentsTable"
import AttributeCard from "../components/attributeCard"
import AmountCard from "../components/amountCard"
import DataCard from "../components/dataCard"
import BeneficiaryGroup from "../components/beneficiaryGroup"
import Translated from "../components/translation"
import SCHEMA from "../schema"
import Viz from "../components/viz"

const useStyles = makeStyles(theme => ({
  moreCard: {
    marginTop: theme.spacing(4),
  },
}))

export const query = graphql`
  query beneficiaryPayments(
    $paymentsLookup: String!
    $countryLookup: String!
    $proofLookup: String!
    $translationLookup: String!
  ) {
    payments: allPaymentsJson(
      filter: { beneficiaryId: { eq: $paymentsLookup } }
    ) {
      nodes {
        id
        programme
        purpose
        amount
        startDate
        endDate
        legalForm
        country
      }
    }
    country: countriesJson(iso: { eq: $countryLookup }) {
      iso
      name
    }
    proof: documentsJson(id: { eq: $proofLookup }) {
      id
      fileName
      fileSize
    }
    translation: translationsJson(key: { eq: $translationLookup }) {
      language
      key
      value
    }
  }
`

export default function BeneficiaryTemplate({
  pageContext: {
    node,
    paymentsLookup,
    countryLookup,
    proofLookup,
    translationLookup,
    route,
    title,
  },
  data: { payments, country, proof, translation },
}) {
  const tableData = {
    country,
    projects_involved: node.projects,
    contracts: node.payments,
    activity_start: node.startDate,
    activity_end: node.endDate,
    website: node.website,
    postal_address: node.address,
  }
  const schema = SCHEMA[node.legalForm]
  const classes = useStyles()
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" gutterBottom>
        {!!translation ? (
          <Translated original={node.name} translations={[translation]} />
        ) : (
          node.name
        )}
        {schema.chip()}
      </Typography>
      <OverviewGrid>
        <div>
          <AmountCard
            color={schema.color}
            viz={
              <Viz
                use="fundingPerProject"
                color="secondary"
                data={payments.nodes}
              />
            }
            {...node}
          />
          {!!node.beneficiaryGroup && (
            <div className={classes.moreCard}>
              <BeneficiaryGroup {...node} />
            </div>
          )}
        </div>
        <AttributeCard data={tableData} linkColor={schema.color} />
        <DataCard color="secondary" {...proof} />
      </OverviewGrid>
      <Typography variant="h4" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable
        rows={payments.nodes}
        exclude={["beneficiaryName", "legalForm", "country"]}
        color={schema.color}
      />
    </Layout>
  )
}
