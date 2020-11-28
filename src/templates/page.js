import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

const Page = ({ data }) => (
  <Layout title={data.post.frontmatter.title}>
    <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
  </Layout>
)

export default Page
