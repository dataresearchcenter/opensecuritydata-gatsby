import React from "react"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import { Button } from "gatsby-theme-material-ui"

const ListItemLink = props => <ListItem button component={Button} {...props} />

const SimpleList = ({ items, getLink, ...props }) => (
  <List {...props}>
    {items.map((item, i) => (
      <ListItemLink key={i} to={getLink(item)}>
        <ListItemText>{item.name}</ListItemText>
      </ListItemLink>
    ))}
  </List>
)

export { ListItemLink, SimpleList }
