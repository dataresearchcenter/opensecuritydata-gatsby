import React from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import CategoriesTable from "../components/categoriesTable"

export const query = graphql`
  query CategoriesQuery {
    categories: allCategoriesJson {
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

const CategoriesPage = ({ data: { categories } }) => (
  <Layout route="Categories">
    <Typography variant="h3" gutterBottom>
      All categories
    </Typography>
    <CategoriesTable rows={categories.nodes} pageSize={25} />
  </Layout>
)

export default CategoriesPage

