import React from "react"
import { graphql } from "gatsby"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import PaymentsTable from "../components/paymentsTable"
import AttributeCard from "../components/attributeCard"
import AmountCard from "../components/amountCard"
import Viz from "../components/viz"
import { BeneficiaryGroupSchema } from "../schema"

export const beneficiaryQuery = graphql`
  query beneficiaryGroupPayments($paymentsLookup: String!) {
    payments: allPaymentsJson(
      filter: { beneficiary_parent: { eq: $paymentsLookup } }
    ) {
      nodes {
        id
        beneficiary_name
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
  }
`

export default function BeneficiaryTemplate({
  pageContext: { node, paymentsLookup, route, title },
  data: { payments },
}) {
  const tableData = {
    projects_involved: node.projects,
    contracts: node.payments,
    activity_start: node.startDate,
    activity_end: node.endDate,
  }
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" gutterBottom>
        {node.name} {BeneficiaryGroupSchema.chip()}
      </Typography>
      <OverviewGrid>
        <AmountCard color={BeneficiaryGroupSchema.color} {...node} />
        <Card>
          <CardContent>
            <Typography color={BeneficiaryGroupSchema.color}>
              {node.name}
            </Typography>
            is a global group consisting of {node.beneficiaries} sub
            beneficiaries.
            <Viz
              use="fundingPerBeneficiary"
              data={payments.nodes}
              color={BeneficiaryGroupSchema.color}
            />
          </CardContent>
        </Card>
        <AttributeCard
          data={tableData}
          linkColor={BeneficiaryGroupSchema.color}
        />
      </OverviewGrid>
      <Typography variant="h4" gutterBottom>
        Funding
      </Typography>
      <PaymentsTable rows={payments.nodes} />
    </Layout>
  )
}
