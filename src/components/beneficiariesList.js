import React from "react"
import slugify from "slugify"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Button } from "gatsby-theme-material-ui"

const ListItemLink = props => <ListItem button component={Button} {...props} />

const BeneficiariesList = ({ items, ...props }) => (
  <List {...props}>
    {items.map((
      { id, name, beneficiary_name } // FIXME
    ) => (
      <ListItemLink
        key={id}
        to={`/beneficiary/${slugify(name || beneficiary_name)}`}
      >
        <ListItemText>{name || beneficiary_name}</ListItemText>
      </ListItemLink>
    ))}
  </List>
)

export default BeneficiariesList
