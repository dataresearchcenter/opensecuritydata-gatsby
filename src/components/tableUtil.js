import React from "react"
import SCHEMA from "../schema"
import Amount from "./amount"
import Date from "./date"
import Country from "./country"

export function renderCell(key, value, linkColor) {
  if (key === "country") return <Country data={value} color={linkColor} />
  if (key === "legalForm") return SCHEMA[value].chip
  if (key.indexOf("amount") > -1) return <Amount value={value} />
  if (
    key.indexOf("date") > -1 ||
    key.indexOf("activity") > -1 ||
    key.indexOf("start") > -1 ||
    key.indexOf("end") > -1
  )
    return <Date date={value} />
  return value
}
