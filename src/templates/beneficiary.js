import React from "react"
import { graphql } from "gatsby"
import Chip from "@material-ui/core/Chip"
import Layout from "../components/layout"
import PaymentsTable from "../components/paymentsTable"
import AttributeTable from "../components/attributeTable"

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
    country: country.name,
    total_amount: node.total_amount,
    projects_involved: node.projects,
    contracts: node.payments,
    activity_start: node.startDate,
    activity_end: node.endDate,
  }
  return (
    <Layout route={route} title={title}>
      <h1>
        {node.name}
        <Chip label={node.schema} />
      </h1>
      <AttributeTable data={tableData} />
      <PaymentsTable
        rows={payments.nodes}
        exclude={["beneficiary_name"]}
        proof={proof}
      />
    </Layout>
  )
}
