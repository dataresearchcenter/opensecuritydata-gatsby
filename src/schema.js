import React from "react"
import Chip from "@material-ui/core/Chip"
import links from "./links"

const SCHEMA = {
  c: {
    schema: "Company",
    label: "Company",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  l: {
    schema: "LegalEntity",
    label: "Other entity",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  o: {
    schema: "Organization",
    label: "Organization",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  p: {
    schema: "PublicBody",
    label: "Public institution",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  j: {
    schema: "Project",
    label: "Project",
    path: "projects",
    getLink: links.getProjectLink,
    color: "primary",
  },
  r: {
    schema: "Programme",
    label: "Funding programme",
    path: "programmes",
    getLink: links.getProgrammeLink,
    color: "primary",
  },
  n: {
    schema: "Country",
    label: "Country",
    path: "countries",
    getLink: links.getCountryLink,
    color: "primary",
  },
  t: {
    schema: "Topic",
    label: "Topic",
    path: "topics",
    getLink: links.getTopicLink,
    color: "primary",
  },
}

Object.keys(SCHEMA).map(k => { // eslint-disable-line
  SCHEMA[k].chip = <Chip color={SCHEMA[k].color} label={SCHEMA[k].label} />
})

export default SCHEMA

const TopicSchema = SCHEMA.t
const ProjectSchema = SCHEMA.j
const ProgrammeSchema = SCHEMA.r
const CountrySchema = SCHEMA.n

export { TopicSchema, ProjectSchema, ProgrammeSchema, CountrySchema }
