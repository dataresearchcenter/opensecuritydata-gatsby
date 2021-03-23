import React from "react"
import { graphql, navigate } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../../components/layout"
import BeneficiariesTable from "../../components/beneficiariesTable"
import { getBeneficiaryGroupLink } from "../../links"

export const query = graphql`
  query {
    allBeneficiaryGroupsJson {
      nodes {
        id
        name
        beneficiaries
        programs
        projects
        amount
        endDate
        startDate
      }
    }
  }
`

const BeneficiaryGroupsPage = ({ data }) => (
  <Layout route="Beneficiaries">
    <Typography variant="h3" gutterBottom>
      All beneficiary groups
    </Typography>
    <Typography variant="body1" component="p" gutterBottom>
      We manually gathered private companies from different countries that
      belong to well-known, big company groups, together. If you see any errors
      or company groups missing, please get in touch: hello@opensecuritydata.eu.
    </Typography>
    <BeneficiariesTable
      rows={data.allBeneficiaryGroupsJson.nodes}
      pageSize={25}
      exclude={["country", "legalForm"]}
      onCellClick={({ row }) => navigate(getBeneficiaryGroupLink(row))}
    />
  </Layout>
)

export default BeneficiaryGroupsPage
