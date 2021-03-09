import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import TopicsTable from "../components/topicTable"

export const query = graphql`
  query topicsQuery {
    topics: allTopicsJson {
      nodes {
        id
        name
        beneficiaries
        projects
        amount
        callName
        workProgramme
      }
    }
  }
`

const TopicsPage = ({ data: { topics } }) => (
  <Layout route="Topics">
    <Typography variant="h3" gutterBottom>All topics</Typography>
    <TopicsTable rows={topics.nodes} pageSize={25} />
  </Layout>
)

export default TopicsPage
