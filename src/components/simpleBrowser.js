import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import CachedIcon from "@material-ui/icons/Cached"
import Button from "@material-ui/core/Button"
import { Link } from "gatsby-theme-material-ui"
import { SimpleList } from "../components/util"
import links from "../links"
import { setHashValue, getHashValue, shuffleArray } from "../util"
import SearchStore from "../searchStore"

const a11yProps = index => ({
  id: `databrowser-tab-${index}`,
  "aria-controls": `databrowser-tabpanel-${index}`,
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

const TabPanel = ({ tabKey, value, index, items, getLink, ...props }) => {
  const [displayItems, setDisplayItems] = useState(items)
  const shuffle = () => setDisplayItems(shuffleArray(items).slice(0, 10))

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`databrowser-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {value === index && (
        <Box p={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Paper>
            <Button
              onClick={shuffle}
              startIcon={<CachedIcon />}
              disabled={items.length < 11}
            >
              Shuffle
            </Button>
            <SimpleList dense items={displayItems} getLink={getLink} />
            <Link to={`/${tabKey}`} color="secondary">
              Show all {tabKey}
            </Link>
          </Paper>
        </Box>
      )}
    </div>
  )
}

const SimpleTabs = () => {
  const classes = useStyles()

  const initialItems = useStaticQuery(graphql`
    query {
      programs: allProgramsJson(limit: 10) {
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
      tags: allTagsJson(limit: 10) {
        nodes {
          name
        }
      }
      topics: allTopicsJson(limit: 10) {
        nodes {
          name
        }
      }
    }
  `)

  const initialTabsData = {
    programs: {
      label: "funding programs",
      getLink: links.getProgramLink,
      items: initialItems.programs.nodes,
      i: 4,
    },
    projects: {
      label: "projects",
      getLink: links.getProjectLink,
      items: initialItems.projects.nodes,
      i: 3,
    },
    topics: {
      label: "topics",
      getLink: links.getTopicLink,
      items: initialItems.topics.nodes,
      i: 6,
    },
    beneficiaries: {
      label: "companies & organizations",
      getLink: links.getBeneficiaryLink,
      items: initialItems.beneficiaries.nodes,
      i: 1,
    },
    countries: {
      label: "countries",
      getLink: links.getCountryLink,
      items: initialItems.countries.nodes,
      i: 5,
    },
    tags: {
      label: "tags",
      getLink: links.getTagLink,
      items: initialItems.tags.nodes,
      i: 8,
    },
  }

  const [tabs, setTabs] = useState(initialTabsData)

  useEffect(() => {
    let mounted = true
    SearchStore.data().then(([_, items]) => {
      if (mounted) {
        const updatedTabs = tabs
        for (const v of Object.values(updatedTabs)) {
          v.items = Object.values(items).filter(
            ({ id }) => id.toString().indexOf(v.i) === 0
          )
        }
        setTabs(updatedTabs)
      }
    })
    return function cleanup() {
      mounted = false
    }
  }, [tabs])

  const tabKeys = [...Object.keys(tabs)]
  const activeTab = getHashValue("tab")
  const [value, setValue] = useState(activeTab ? tabKeys.indexOf(activeTab) : 0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setHashValue("tab", tabKeys[newValue])
  }

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
        <TabPanel
          value={value}
          index={i}
          key={k}
          tabKey={k}
          items={tabs[k].items}
          getLink={tabs[k].getLink}
        />
      ))}
    </div>
  )
}

export default SimpleTabs
