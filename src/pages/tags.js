import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import TagsTable from "../components/tagsTable"

export const query = graphql`
  query TagsQuery {
    tags: allTagsJson {
      nodes {
        id
        name
        beneficiaries
        projects
        amount
        startDate
        endDate
      }
    }
  }
`

const TagsPage = ({ data: { tags } }) => (
  <Layout route="Tags">
    <Typography variant="h3" gutterBottom>
      All tags
    </Typography>
    <TagsTable rows={tags.nodes} pageSize={25} />
  </Layout>
)

export default TagsPage

