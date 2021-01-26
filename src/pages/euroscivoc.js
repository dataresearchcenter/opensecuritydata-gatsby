import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import EuroSciVocTree from "../components/euroscivocTree"

export const query = graphql`
  query EuroSciVocQuery {
    euroscivoc: allEuroscivocJson {
      nodes {
        key
        name
        descendants
        ancestor
      }
    }
  }
`

const EuroSciVocPage = ({ data: { euroscivoc } }) => (
  <Layout route="EuroSciVoc">
    <h1>EuroSciVoc</h1>
    <EuroSciVocTree euroscivoc={euroscivoc.nodes} />
  </Layout>
)

export default EuroSciVocPage
