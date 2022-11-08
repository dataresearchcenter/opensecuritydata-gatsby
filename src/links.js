import _slugify from "slugify"
import { pathSlugify } from "./util"

const slugify = value =>
  value.length < 100
    ? _slugify(value)
    : `${_slugify(value).slice(0, 100)}--${value.length}`

const getProgramLink = ({ name }) => `/programs/${slugify(name)}`

const getProjectLink = ({ name }) => `/projects/${slugify(name)}`

const getTopicLink = ({ name }) => `/topics/${slugify(name)}`

const getCountryLink = ({ iso, key }) => `/countries/${iso || key}`

const getTagLink = ({ name }) => `/tags/${slugify(name)}`

const getBeneficiaryLink = ({ name }) => `/beneficiaries/${slugify(name)}`

const getBeneficiaryGroupLink = ({ name }) =>
  `/beneficiaries/groups/${slugify(name)}`

export default {
  getProgramLink,
  getProjectLink,
  getTopicLink,
  getCountryLink,
  getTagLink,
  getBeneficiaryLink,
  getBeneficiaryGroupLink,
}

export {
  getProgramLink,
  getProjectLink,
  getTopicLink,
  getCountryLink,
  getTagLink,
  getBeneficiaryLink,
  getBeneficiaryGroupLink,
}
