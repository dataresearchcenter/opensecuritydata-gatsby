import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import loadSpreadsheet from "../lib/load-spreadsheets.js"
import Layout from "../components/layout"
import Stories from "../components/stories"
import { TeamAvatar } from "../components/story"

export const query = graphql`
  query {
    site {
      siteMetadata {
        storiesSpreadsheet
      }
    }
  }
`

const StoriesPage = ({ data: { site } }) => {
  const [stories, setStories] = useState([])
  useEffect(
    () =>
      loadSpreadsheet(site.siteMetadata.storiesSpreadsheet, 1, d =>
        setStories(d)
      ),
    []
  )
  return (
    <Layout route="Stories">
      <Typography variant="h3">Stories</Typography>
      <Typography component="div" variant="body2" gutterBottom>
        Find articles related to European Union security funding. Articles
        marked with <TeamAvatar inline /> have been written by our team. If you
        are a journalist publishing on these topics and would like to have your
        work included, please send us a link at:{" "}
        <Link href="mailto:hello@opensecuritydata.eu">
          hello@opensecuritydata.eu
        </Link>
        .
      </Typography>
      <Stories stories={stories} />
    </Layout>
  )
}

export default StoriesPage
