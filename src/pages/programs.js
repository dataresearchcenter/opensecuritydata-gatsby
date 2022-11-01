import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import styled from "@emotion/styled"
import Paper from "@mui/material/Paper"
import Typography from "@material-ui/core/Typography"
import Layout from "../components/layout"
import ProgramCard from "../components/programCard"

const Program = styled(Paper)`
  padding: 20px;
  margin-bottom: 50px;
  background-color: ${({ scope }) =>
    scope === "military" ? "#f3e5f5" : "#e3f2fd"};
`

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
    programsMeta: allProgramMetaJson {
      nodes {
        name
        scope
        description
        url
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
    backgroundColor: "transparent",
  },
}))

const ProgramsPage = ({ data: { programs, programsMeta } }) => {
  const getMeta = name => programsMeta.nodes.find(d => d.name === name)

  const classes = useStyles()
  return (
    <Layout route="All funding programs">
      <Typography variant="h3">Funding programs</Typography>
      {programs.nodes.map(p => {
        const data = { ...p, ...getMeta(p.name) }
        return (
          <Program scope={data.scope}>
            <ProgramCard className={classes.card} key={data.id} {...data} />
          </Program>
        )
      })}
    </Layout>
  )
}

export default ProgramsPage
