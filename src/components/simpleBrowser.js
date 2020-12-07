import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { Link } from "gatsby-theme-material-ui"
import { SimpleList } from "../components/util"
import links from "../links"
import { updateLocationParams, getLocationParam } from "../util"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`databrowser-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>
            Tenetur sunt deleniti natus est ea officia ea. Fuga id molestiae
            vitae quia aut ab. Quisquam voluptas consequatur quo repellat qui
            molestiae impedit fuga. Possimus delectus perspiciatis molestiae et
            quia asperiores qui. Vitae qui aliquid voluptas tenetur nihil
            dolorum itaque. Vel deleniti ea sint facere.
          </Typography>
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `databrowser-tab-${index}`,
    "aria-controls": `databrowser-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()

  const tabs = {
    programmes: {
      label: "funding programmes",
      getLink: links.getProgrammeLink,
    },
    projects: {
      label: "projects",
      getLink: links.getProjectLink,
    },
    topics: {
      label: "topics",
      getLink: links.getTopicLink,
    },
    beneficiaries: {
      label: "companies & organizations",
      getLink: links.getBeneficiaryLink,
    },
    countries: {
      label: "countries",
      getLink: links.getCountryLink,
    },
  }

  const tabKeys = [...Object.keys(tabs)]
  const activeTab = getLocationParam("show")
  const [value, setValue] = React.useState(
    activeTab ? tabKeys.indexOf(activeTab) : 0
  )
  const handleChange = (event, newValue) => {
    setValue(newValue)
    updateLocationParams({ show: tabKeys[newValue] })
  }

  const data = useStaticQuery(graphql`
    query SimpleBrowserQuery {
      programmes: allProgrammesJson(limit: 10) {
        nodes {
          name
        }
      }
      projects: allProjectsJson(limit: 10) {
        nodes {
          name
        }
      }
      beneficiaries: allBeneficiariesJson(limit: 10) {
        nodes {
          name
        }
      }
      countries: allCountriesJson(limit: 10) {
        nodes {
          iso
          name
        }
      }
      topics: allTopicsJson(limit: 10) {
        nodes {
          key
          name
        }
      }
    }
  `)

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="data browser"
          centered
        >
          {Object.keys(tabs).map((k, i) => (
            <Tab label={tabs[k].label} {...a11yProps(i)} key={i} />
          ))}
        </Tabs>
      </Paper>
      {Object.keys(tabs).map((k, i) => (
        <TabPanel value={value} index={i} key={i}>
          <Paper>
            <SimpleList dense items={data[k].nodes} getLink={tabs[k].getLink} />
            <Link to={`/${k}`}>Browse all {k}</Link>
          </Paper>
        </TabPanel>
      ))}
    </div>
  )
}
