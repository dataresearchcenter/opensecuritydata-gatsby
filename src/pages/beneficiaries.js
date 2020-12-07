import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BeneficiariesTable from "../components/beneficiariesTable"

export const query = graphql`
  query BeneficiariesQuery {
    allBeneficiariesJson {
      nodes {
        id
        name
        schema
        country
        programmes
        payments
        total_amount
        projects
        startDate
        endDate
      }
    }
  }
`

const BeneficiariesPage = ({ data }) => (
  <Layout route="Beneficiaries">
    <h1>All beneficiaries</h1>
    <BeneficiariesTable rows={data.allBeneficiariesJson.nodes} />
  </Layout>
)

export default BeneficiariesPage
