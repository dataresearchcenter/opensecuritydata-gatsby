import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import DataDownload from "../components/downloadData"

export const query = graphql`
  query DocumentsQuery {
    documents: allDocumentsJson {
      nodes {
        id
        fileName
        fileSize
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
  },
}))

const DocumentCard = data => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.fileName}
        </Typography>
        <Typography variant="body1" component="p">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum.
        </Typography>
      </CardContent>
      <CardActions>
        <DataDownload color="primary" {...data} />
      </CardActions>
    </Card>
  )
}

const DownloadPage = ({ data: { documents } }) => (
  <Layout route="Data">
    <Typography variant="h3" component="h1" gutterBottom>
      All source data
    </Typography>
    {documents.nodes.map(d => (
      <DocumentCard key={d.id} {...d} />
    ))}
  </Layout>
)

export default DownloadPage
