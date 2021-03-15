import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import ProgramCard from "../components/programCard"

export const query = graphql`
  query ProgramsQuery {
    programs: allProgramsJson {
      nodes {
        name
        projects
        beneficiaries
        amount
        id
      }
    }
    descriptions: allProgramMetaJson {
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

const ProgramsPage = ({ data: { programs, descriptions } }) => {
  const classes = useStyles()
  return (
    <Layout route="All funding programs">
      <Typography variant="h3">Funding programs</Typography>
      {programs.nodes.map(p => (
        <ProgramCard
          className={classes.card}
          key={p.id}
          {...getDescription(p.name, descriptions)}
          {...p}
        />
      ))}
    </Layout>
  )
}

export default ProgramsPage
