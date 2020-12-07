import slugify from "slugify"
import { pathSlugify } from "./util"

const getProgrammeLink = ({ name }) => `/programmes/${slugify(name)}`

const getProjectLink = ({ name }) => `/projects/${slugify(name)}`

const getTopicLink = ({ key }) => `/topics/${pathSlugify(key)}`

const getCountryLink = ({ iso }) => `/countries/${iso}`

const getBeneficiaryLink = ({ name }) => `/beneficiaries/${slugify(name)}`

export default {
  getProgrammeLink,
  getProjectLink,
  getTopicLink,
  getCountryLink,
  getBeneficiaryLink,
}
