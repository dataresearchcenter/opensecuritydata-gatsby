import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
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
  <Layout
    route={data.post.frontmatter.title}
    title={data.post.frontmatter.title}
  >
    <Typography variant="h3">{data.post.frontmatter.title}</Typography>
    <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
  </Layout>
)

export default Page
