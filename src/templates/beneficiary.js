import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Layout from "../components/layout"
import OverviewGrid from "../components/overviewGrid"
import ParticipationsTable from "../components/participationsTable"
import AttributeCard from "../components/attributeCard"
import AmountCard from "../components/amountCard"
import DataCard from "../components/dataCard"
import CardsWrapper from "../components/cardsWrapper"
import BeneficiaryGroup from "../components/beneficiaryGroup"
import Translated from "../components/translation"
import Viz from "../components/viz"
import SCHEMA from "../schema"

export const query = graphql`
  query beneficiaryParticipations(
    $foreignId: String!
    $countryLookup: String!
  ) {
    participations: allParticipationsJson(
      filter: { beneficiaryId: { eq: $foreignId } }
    ) {
      nodes {
        ...ParticipationFragment
      }
    }
    country: countriesJson(iso: { eq: $countryLookup }) {
      iso
      name
    }
    ftmData: entitiesJson(id: { eq: $foreignId }) {
      properties {
        name
        vatCode
      }
    }
  }
`

export default function BeneficiaryTemplate({
  pageContext: { node, foreignId, countryLookup, route, title },
  data: { participations, country, translations, ftmData },
}) {
  const SPACER = " · "
  const tableData = {
    country,
    projects_involved: node.projects,
    activity_start: node.startDate,
    activity_end: node.endDate,
    website: node.website,
    postal_address: node.address,
    vat_number: ftmData?.vatCode?.join(SPACER),
  }
  const schema = SCHEMA[node.legalForm]
  return (
    <Layout route={route} title={title}>
      <Typography variant="h3" gutterBottom>
        {!!translations ? (
          <Translated
            original={node.name}
            translations={translations.nodes}
            identifier="beneficiary"
          />
        ) : (
          node.name
        )}
        {schema.chip()}
      </Typography>
      <OverviewGrid>
        <CardsWrapper>
          <AmountCard
            color={schema.color}
            viz={
              <Viz
                use="fundingPerProject"
                color="secondary"
                data={participations.nodes}
              />
            }
            {...node}
          />
          {!!node.beneficiaryGroup && <BeneficiaryGroup {...node} />}
        </CardsWrapper>
        <AttributeCard data={tableData} linkColor={schema.color} />
        <DataCard color="secondary" />
      </OverviewGrid>
      <Typography variant="h4" gutterBottom>
        Funding
      </Typography>
      <ParticipationsTable
        rows={participations.nodes}
        exclude={["beneficiaryName", "legalForm", "country"]}
        color={schema.color}
      />
    </Layout>
  )
}
