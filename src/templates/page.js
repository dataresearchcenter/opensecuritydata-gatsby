import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Stories from "../components/stories"

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        stories {
          title
          abstract
          date
          image
          url
          publisher
        }
      }
    }
  }
`

const Page = ({ data }) => (
  <Layout title={data.post.frontmatter.title}>
    <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
    {data.post.frontmatter.stories && <Stories stories={data.post.frontmatter.stories} />}
  </Layout>
)

export default Page
