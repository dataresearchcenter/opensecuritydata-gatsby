import React from "react"
import { graphql } from "gatsby"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ParticipationsTable from "../components/participationsTable"
import AttributeCard from "../components/attributeCard"
import AmountCard from "../components/amountCard"
import Viz from "../components/viz"
import { BeneficiaryGroupSchema } from "../schema"

export const query = graphql`
  query beneficiaryGroupParticipations($foreignId: String!) {
    participations: allParticipationsJson(
      filter: { beneficiaryGroupId: { eq: $foreignId } }
    ) {
      nodes {
        ...ParticipationFragment
      }
    }
  }
`

export default function BeneficiaryTemplate({
  pageContext: { node, foreignId, route, title },
  data: { participations },
}) {
  const tableData = {
    projects_involved: node.projects,
    activity_start: node.startDate,
    activity_end: node.endDate,
  }
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" component="h1" gutterBottom>
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
              data={participations.nodes}
              color={BeneficiaryGroupSchema.color}
            />
          </CardContent>
        </Card>
        <AttributeCard
          data={tableData}
          linkColor={BeneficiaryGroupSchema.color}
        />
      </OverviewGrid>
      <Typography variant="h4" component="h2" gutterBottom>
        Funding
      </Typography>
      <ParticipationsTable rows={participations.nodes} color={BeneficiaryGroupSchema.color} />
    </Layout>
  )
}
