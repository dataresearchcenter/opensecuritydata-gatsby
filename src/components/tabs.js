import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import slugify from "slugify"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import { setHashValue, getHashValue } from "../util"

const a11yProps = index => ({
  id: `databrowser-tab-${index}`,
  "aria-controls": `databrowser-tabpanel-${index}`,
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`databrowser-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </div>
)

const FundingTables = ({ children, ...tabsProps }) => {
  const classes = useStyles()
  const tabs = children.map(({ props }) => slugify(props.title).toLowerCase())
  const activeTab = getHashValue("tab")
  const [value, setValue] = React.useState(
    activeTab ? tabs.indexOf(activeTab) : 0
  )
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setHashValue("tab", tabs[newValue])
  }
  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="data browser"
        {...tabsProps}
      >
        {children.map((c, i) => (
          <Tab label={c.props.title} {...a11yProps(i)} key={i} />
        ))}
      </Tabs>
      {children.map((c, i) => (
        <TabPanel value={value} index={i} key={i}>
          {c}
        </TabPanel>
      ))}
    </div>
  )
}

export default FundingTables
