import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import CachedIcon from "@material-ui/icons/Cached"
import Button from "@material-ui/core/Button"
import { Link } from "gatsby-theme-material-ui"
import { SimpleList } from "../components/util"
import { LocalSearchData } from "../components/search"
import links from "../links"
import { setHashValue, getHashValue, shuffleArray } from "../util"

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
        <Box p={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const a11yProps = index => ({
  id: `databrowser-tab-${index}`,
  "aria-controls": `databrowser-tabpanel-${index}`,
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const { store } = LocalSearchData()

  const getItems = i =>
    shuffleArray(
      Object.values(store).filter(({ id }) => id.toString().indexOf(i) === 0)
    ).slice(0, 10)

  const tabs = {
    programs: {
      label: "funding programs",
      getLink: links.getProgramLink,
      store: useState(getItems(4)),
      i: 4,
    },
    projects: {
      label: "projects",
      getLink: links.getProjectLink,
      store: useState(getItems(3)),
      i: 3,
    },
    topics: {
      label: "topics",
      getLink: links.getTopicLink,
      store: useState(getItems(6)),
      i: 6,
    },
    beneficiaries: {
      label: "companies & organizations",
      getLink: links.getBeneficiaryLink,
      store: useState(getItems(1)),
      i: 1,
    },
    countries: {
      label: "countries",
      getLink: links.getCountryLink,
      store: useState(getItems(5)),
      i: 5,
    },
    tags: {
      label: "tags",
      getLink: links.getTagLink,
      store: useState(getItems(8)),
      i: 8,
    },
  }
  Object.values(tabs).map(v => { //eslint-disable-line
    const [items, setItems] = v.store
    v.items = items
    v.shuffle = () => setItems(getItems(v.i))
  })

  const tabKeys = [...Object.keys(tabs)]
  const activeTab = getHashValue("show")
  const [value, setValue] = useState(activeTab ? tabKeys.indexOf(activeTab) : 0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setHashValue("show", tabKeys[newValue])
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
        <TabPanel value={value} index={i} key={i}>
          <Paper>
            {tabs[k].items.length === 10 && (
              <Button onClick={tabs[k].shuffle} startIcon={<CachedIcon />}>
                Shuffle
              </Button>
            )}
            <SimpleList dense items={tabs[k].items} getLink={tabs[k].getLink} />
            <Link to={`/${k}`} color="secondary">
              Show all {k}
            </Link>
          </Paper>
        </TabPanel>
      ))}
    </div>
  )
}
