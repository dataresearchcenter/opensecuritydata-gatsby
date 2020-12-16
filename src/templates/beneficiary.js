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
import SCHEMA from "../schema"

const useStyles = makeStyles(theme => ({
  moreCard: {
    marginTop: theme.spacing(4),
  },
}))

export const beneficiaryQuery = graphql`
  query beneficiaryPayments(
    $paymentsLookup: String!
    $countryLookup: String!
    $proofLookup: String!
  ) {
    payments: allPaymentsJson(
      filter: { beneficiary_id: { eq: $paymentsLookup } }
    ) {
      nodes {
        id
        programme
        purpose
        amount
        summary
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
  }
`

export default function BeneficiaryTemplate({
  pageContext: {
    node,
    paymentsLookup,
    countryLookup,
    proofLookup,
    route,
    title,
  },
  data: { payments, country, proof },
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
        {node.name} {schema.chip()}
      </Typography>
      <OverviewGrid>
        <div>
          <AmountCard color={schema.color} {...node} />
          {!!node.beneficiaryGroup && (
            <div className={classes.moreCard}>
              <BeneficiaryGroup {...node} />
            </div>
          )}
        </div>
        <AttributeCard data={tableData} linkColor={schema.color} />
        <DataCard {...proof} />
      </OverviewGrid>
      <Typography variant="h4" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable
        rows={payments.nodes}
        exclude={["beneficiary_name", "legalForm", "country"]}
      />
    </Layout>
  )
}
