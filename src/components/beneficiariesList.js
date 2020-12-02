import React from "react"
import slugify from "slugify"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import { ListItemLink } from "./util"

const BeneficiariesList = ({ items, ...props }) => (
  <List {...props}>
    {items.map(({ id, beneficiary_name }) => (
      <ListItemLink key={id} to={`/beneficiary/${slugify(beneficiary_name)}`}>
        <ListItemText>{beneficiary_name}</ListItemText>
      </ListItemLink>
    ))}
  </List>
)

export default BeneficiariesList
