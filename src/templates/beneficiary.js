import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import PaymentsTable from "../components/paymentsTable"
import AttributeCard from "../components/attributeCard"
import AmountCard from "../components/amountCard"
import DataCard from "../components/dataCard"
import SCHEMA from "../schema"

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
  }
  const schema = SCHEMA[node.legalForm]
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" gutterBottom>
        {node.name} {schema.chip}
      </Typography>
      <OverviewGrid>
        <AmountCard color={schema.color} {...node} />
        <AttributeCard data={tableData} linkColor={schema.color} />
        <DataCard sourceUrl="https://cordis.europa.eu/" {...proof} />
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
