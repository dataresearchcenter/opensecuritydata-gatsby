import React from "react"
import ListItem from "@material-ui/core/ListItem"
import { Button } from "gatsby-theme-material-ui"

const ListItemLink = props => <ListItem button component={Button} {...props} />

export { ListItemLink }
