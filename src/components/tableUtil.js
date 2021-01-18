import React from "react"
import { navigate } from "gatsby"
import Link from "@material-ui/core/Link"
import SCHEMA from "../schema"
import links from "../links"
import Amount from "./amount"
import Date from "./date"
import Country from "./country"

export function renderCell(key, value, linkColor) {
  if (!value) return value
  if (key === "country") return <Country data={value} color={linkColor} />
  if (key === "legalForm") return SCHEMA[value].chip({ variant: "outlined" })
  if (key.indexOf("amount") > -1) return <Amount value={value} />
  if (
    key.indexOf("date") > -1 ||
    key.indexOf("activity") > -1 ||
    key.indexOf("start") > -1 ||
    key.indexOf("end") > -1
  )
    return <Date date={value} />
  if (value.toString().indexOf("http") === 0)
    return (
      <Link href={value} color={linkColor}>
        {value}
      </Link>
    )
  return value
}

export function onCellClick({ field, row }, getLink) {
  switch (field) {
    case "programme":
      navigate(links.getProgrammeLink({ name: row.programme }))
      break
    case "purpose":
      navigate(links.getProjectLink({ name: row.purpose }))
      break
    case "country":
      navigate(links.getCountryLink({ iso: row.country }))
      break
    case "beneficiary_name":
      navigate(links.getBeneficiaryLink({ name: row.beneficiary_name }))
      break
    default:
      getLink
        ? navigate(getLink(row))
        : row.beneficiary_name &&
          navigate(links.getBeneficiaryLink({ name: row.beneficiary_name }))
  }
}

export function numericSort(value1, value2) {
  return parseFloat(value1) - parseFloat(value2)
}
