import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import CachedIcon from "@material-ui/icons/Cached"
import Button from "@material-ui/core/Button"
import { Link } from "gatsby-theme-material-ui"
import { SimpleList } from "../components/util"
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

const a11yProps = index => ({
  id: `databrowser-tab-${index}`,
  "aria-controls": `databrowser-tabpanel-${index}`,
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function SimpleTabs({ data }) {
  const classes = useStyles()

  const getItems = i =>
    shuffleArray(
      Object.values(data).filter(({ id }) => id.toString().indexOf(i) === 0)
    ).slice(0, 10)

  const tabs = {
    programmes: {
      label: "funding programmes",
      getLink: links.getProgrammeLink,
      getItems: () => getItems(4),
    },
    projects: {
      label: "projects",
      getLink: links.getProjectLink,
      getItems: () => getItems(3),
    },
    topics: {
      label: "topics",
      getLink: links.getTopicLink,
      getItems: () => getItems(6),
    },
    beneficiaries: {
      label: "companies & organizations",
      getLink: links.getBeneficiaryLink,
      getItems: () => getItems(1),
    },
    countries: {
      label: "countries",
      getLink: links.getCountryLink,
      getItems: () => getItems(5),
    },
    categories: {
      label: "categories",
      getLink: links.getCategoryLink,
      getItems: () => getItems(8),
    },
  }

  const tabKeys = [...Object.keys(tabs)]
  const activeTab = getHashValue("show")
  const [value, setValue] = useState(activeTab ? tabKeys.indexOf(activeTab) : 0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setHashValue("show", tabKeys[newValue])
  }

  // const shuffle = () => setValue(activeTab ? tabKeys.indexOf(activeTab) : 0) // FIXME

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
            {
              // <Button onClick={shuffle} startIcon={<CachedIcon />}>
              // Shuffle list
              // </Button>
            }
            <SimpleList
              dense
              items={tabs[k].getItems()}
              getLink={tabs[k].getLink}
            />
            <Link to={`/${k}`}>Browse all {k}</Link>
          </Paper>
        </TabPanel>
      ))}
    </div>
  )
}
