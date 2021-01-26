import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import TreeView from "@material-ui/lab/TreeView"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import CloseIcon from "@material-ui/icons/Close"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import LaunchIcon from "@material-ui/icons/Launch"
import TreeItem from "@material-ui/lab/TreeItem"
import { Button, IconButton } from "gatsby-theme-material-ui"
import { pathSlugify } from "../util"

const useStyles = makeStyles({
  root: {
    height: "auto",
    flexGrow: 1,
    maxWidth: 400,
  },
})

const buildTree = (euroscivoc, root) =>
  euroscivoc
    .filter(({ ancestor }) => ancestor === root)
    .map(t => ({ ...t, children: buildTree(euroscivoc, t.key) }))

export default function EuroSciVocTree({ euroscivoc, root = null }) {
  const classes = useStyles()
  const allKeys = euroscivoc.map(({ key }) => key)
  const tree = buildTree(euroscivoc, root)
  const [expanded, setExpanded] = useState(allKeys.length > 7 ? [] : allKeys)
  const handleToggle = (e, ids) => setExpanded(ids)
  const closeAll = () => setExpanded([])
  const expandAll = () => setExpanded(allKeys)
  const allExpanded = expanded.length === euroscivoc.length
  const allClosed = expanded.length === 0
  const renderTree = node => (
    <TreeItem
      key={node.key}
      nodeId={node.key}
      label={
        <>
          {node.name}
          <IconButton size="small" to={`/euroscivoc/${pathSlugify(node.key)}`}>
            <LaunchIcon />
          </IconButton>
        </>
      }
    >
      {node.children?.length > 0 && node.children.map(renderTree)}
    </TreeItem>
  )

  return (
    <>
      {allKeys.length > 7 && (
        <ButtonGroup>
          <Button
            size="small"
            disabled={allExpanded}
            onClick={expandAll}
            startIcon={<ExpandMoreIcon />}
          >
            Expand all
          </Button>
          <Button
            size="small"
            disabled={allClosed}
            onClick={closeAll}
            startIcon={<CloseIcon />}
          >
            Close all
          </Button>
        </ButtonGroup>
      )}
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
      >
        {tree.map(renderTree)}
      </TreeView>
    </>
  )
}
