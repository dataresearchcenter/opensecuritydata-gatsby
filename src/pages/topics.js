import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TopicTree from "../components/topicTree"

export const query = graphql`
  query TopicsQuery {
    topics: allTopicsJson {
      nodes {
        key
        name
        descendants
        ancestor
      }
    }
  }
`

const TopicsPage = ({ data: { topics } }) => (
  <Layout route="Topics">
    <h1>Topics</h1>
    <TopicTree topics={topics.nodes} />
  </Layout>
)

export default TopicsPage
