import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import BeneficiariesTable from "../components/beneficiariesTable"

export const query = graphql`
  query {
    allBeneficiariesJson {
      nodes {
        id
        name
        legalForm
        country
        programs
        amount
        projects
        startDate
        endDate
      }
    }
  }
`

const BeneficiariesPage = ({ data }) => (
  <Layout route="Beneficiaries">
    <Typography variant="h3" gutterBottom>
      All beneficiaries
    </Typography>
    <BeneficiariesTable rows={data.allBeneficiariesJson.nodes} pageSize={25} />
  </Layout>
)

export default BeneficiariesPage
