import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import ProgrammeCard from "../components/programmeCard"

export const query = graphql`
  query ProgrammesQuery {
    programmes: allProgrammesJson {
      nodes {
        name
        projects
        beneficiaries
        amount
        id
      }
    }
    descriptions: allProgrammeMetaJson {
      nodes {
        name
        description
        url
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
  },
}))

const getDescription = (name, descriptions) =>
  descriptions.nodes.find(d => d.name === name)

const ProgrammesPage = ({ data: { programmes, descriptions } }) => {
  const classes = useStyles()
  return (
    <Layout route="All funding programmes">
      <Typography variant="h3">Funding programmes</Typography>
      {programmes.nodes.map(p => (
        <ProgrammeCard
          className={classes.card}
          key={p.id}
          data={p}
          texts={getDescription(p.name, descriptions)}
        />
      ))}
    </Layout>
  )
}

export default ProgrammesPage
