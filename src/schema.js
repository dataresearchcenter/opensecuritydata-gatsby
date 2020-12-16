import React from "react"
import Chip from "@material-ui/core/Chip"
import links from "./links"

const SCHEMA = {
  prc: {
    schema: "Company",
    label: "Private company",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  oth: {
    schema: "LegalEntity",
    label: "Other",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  hes: {
    schema: "Organization",
    label: "Higher education institution",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  rec: {
    schema: "Organization",
    label: "Research institution",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  pub: {
    schema: "PublicBody",
    label: "Public institution",
    path: "beneficiaries",
    getLink: links.getBeneficiaryLink,
    color: "secondary",
  },
  g: {
    schema: "LegalEntity",
    label: "Beneficiary Group",
    path: "beneficiaries/groups",
    getLink: links.getBeneficiaryGroupLink,
    color: "secondary",
  },
  p: {
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
  c: {
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
  SCHEMA[k].chip = ({ ...props } = {}) => (
    <Chip color={SCHEMA[k].color} label={SCHEMA[k].label} {...props} />
  )
})

export default SCHEMA

const TopicSchema = SCHEMA.t
const ProjectSchema = SCHEMA.p
const ProgrammeSchema = SCHEMA.r
const CountrySchema = SCHEMA.c
const BeneficiaryGroupSchema = SCHEMA.g

export { TopicSchema, ProjectSchema, ProgrammeSchema, CountrySchema, BeneficiaryGroupSchema }
