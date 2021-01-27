import _slugify from "slugify"
import { pathSlugify } from "./util"

const slugify = value =>
  value.length < 100
    ? _slugify(value)
    : `${_slugify(value).slice(0, 100)}--${value.length}`

const getProgrammeLink = ({ name }) => `/programmes/${slugify(name)}`

const getProjectLink = ({ name }) => `/projects/${slugify(name)}`

const getEuroSciVocLink = ({ key }) => `/euroscivoc/${pathSlugify(key)}`

const getTopicLink = ({ name }) => `/topics/${slugify(name)}`

const getCountryLink = ({ iso, key }) => `/countries/${iso || key}`

const getBeneficiaryLink = ({ name }) => `/beneficiaries/${slugify(name)}`

const getBeneficiaryGroupLink = ({ name }) =>
  `/beneficiaries/groups/${slugify(name)}`

export default {
  getProgrammeLink,
  getProjectLink,
  getTopicLink,
  getEuroSciVocLink,
  getCountryLink,
  getBeneficiaryLink,
  getBeneficiaryGroupLink,
}

export {
  getProgrammeLink,
  getProjectLink,
  getTopicLink,
  getEuroSciVocLink,
  getCountryLink,
  getBeneficiaryLink,
  getBeneficiaryGroupLink,
}
