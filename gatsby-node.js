const _slugify = require(`slugify`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const slugify = value =>
  value.length < 100
    ? _slugify(value)
    : `${_slugify(value).slice(0, 100)}--${value.length}`

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allProgrammesJson {
        edges {
          node {
            id
            name
            projects
            beneficiaries
            amount
            proof
            startDate
            endDate
          }
        }
      }
      allProjectsJson {
        edges {
          node {
            id
            name
            description
            programme
            beneficiaries
            amount
            proof
            startDate
            endDate
            sourceUrl
            topicName
            euroscivoc
          }
        }
      }
      allBeneficiaryGroupsJson {
        edges {
          node {
            id
            foreign_id
            name
            beneficiaries
            programmes
            projects
            payments
            amount
            endDate
            startDate
          }
        }
      }
      allBeneficiariesJson {
        edges {
          node {
            id
            name
            country
            legalForm
            address
            website
            programmes
            projects
            payments
            amount
            endDate
            startDate
            proof
            beneficiaryGroup
            beneficiaryGroupId
            notes
          }
        }
      }
      allCountriesJson {
        edges {
          node {
            id
            name
            iso
            projects
            beneficiaries
            payments
            amount
            startDate
            endDate
          }
        }
      }
      allEuroscivocJson {
        edges {
          node {
            ancestor
            descendants
            key
            name
            payments
            beneficiaries
            projects
            programmes
            amount
            startDate
            endDate
          }
        }
      }
      allTopicsJson {
        edges {
          node {
            name
            code
            payments
            beneficiaries
            projects
            programmes
            amount
            startDate
            endDate
          }
        }
      }
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // programmes
  result.data.allProgrammesJson.edges.forEach(({ node }) => {
    createPage({
      path: `/programmes/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/programme.js`),
      context: {
        node,
        projectsLookup: node.name,
        proofLookup: node.proof,
        route: `Programmes`,
        title: node.name,
      },
    })
  })

  // projects
  result.data.allProjectsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/projects/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/project.js`),
      context: {
        node,
        projectLookup: node.name,
        programmeLookup: node.programme,
        topicLookup: node.topicName || "",
        euroscivocLookup: (JSON.parse(node.euroscivoc) || []).map(i =>
          i.substring(1)
        ),
        proofLookup: node.proof,
        route: `Projects`,
        title: node.name,
      },
    })
  })

  // beneficiaries
  result.data.allBeneficiariesJson.edges.forEach(({ node }) => {
    createPage({
      path: `/beneficiaries/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/beneficiary.js`),
      context: {
        node,
        paymentsLookup: node.id,
        countryLookup: node.country,
        proofLookup: node.proof,
        route: `Beneficiaries`,
        title: node.name,
      },
    })
  })

  // beneficiary groups
  result.data.allBeneficiaryGroupsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/beneficiaries/groups/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/beneficiaryGroup.js`),
      context: {
        node,
        paymentsLookup: node.foreign_id,
        route: `Beneficiary groups`,
        title: node.name,
      },
    })
  })

  // countries
  result.data.allCountriesJson.edges.forEach(({ node }) => {
    createPage({
      path: `/countries/${node.iso}`,
      component: require.resolve(`./src/templates/country.js`),
      context: {
        node,
        lookup: node.iso,
        proofLookup: node.proof,
        route: `Countries`,
        title: node.name,
      },
    })
  })

  // topics
  result.data.allTopicsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/topics/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/topic.js`),
      context: {
        node,
        lookup: node.name,
        route: `Topics`,
        title: node.name,
      },
    })
  })

  // euroscivoc
  const pathSlugify = path =>
    path
      .split("/")
      .map(p => slugify(p))
      .join("/")
  result.data.allEuroscivocJson.edges.forEach(({ node }) => {
    createPage({
      path: `/euroscivoc/${pathSlugify(node.key)}`,
      component: require.resolve(`./src/templates/euroscivoc.js`),
      context: {
        node,
        ancestorLookup: node.ancestor || "",
        descendantsLookup: `/^${node.key}/`,
        projectsLookup: `/${node.key.replace("/", "\\/")}/`,
        route: `EuroSciVoc`,
        title: node.name,
      },
    })
  })

  // md pages
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/page.js`),
      context: { slug: node.fields.slug },
    })
  })
}
