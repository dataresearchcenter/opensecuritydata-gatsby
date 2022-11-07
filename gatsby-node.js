const _slugify = require(`slugify`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const slugify = value =>
  value
    ? value.length < 100
      ? _slugify(value)
      : `${_slugify(value).slice(0, 100)}--${value.length}`
    : "DATA-MISSING"

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
  const { createPage, createRedirect } = actions
  const result = await graphql(`
    query {
      allProgramsJson {
        edges {
          node {
            id
            name
            projects
            beneficiaries
            amount
            startDate
            endDate
          }
        }
      }
      allProjectsJson {
        edges {
          node {
            id
            foreign_id
            name
            description
            program
            beneficiaries
            amount
            startDate
            endDate
            sourceUrl
            topicName
            tags
            callName
            callId
            workProgram
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
            programs
            projects
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
            foreign_id
            name
            country
            legalForm
            address
            website
            programs
            projects
            amount
            endDate
            startDate
            beneficiaryGroup
            beneficiaryGroupId
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
            amount
            startDate
            endDate
          }
        }
      }
      allTagsJson {
        edges {
          node {
            id
            name
            projects
            beneficiaries
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
            callName
            callId
            workProgram
            beneficiaries
            projects
            programs
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

  // programs
  result.data.allProgramsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/programs/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/program.js`),
      context: {
        node,
        lookup: node.name,
        route: `Programs`,
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
        foreignId: node.foreign_id,
        projectLookup: node.name,
        programLookup: node.program,
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
        foreignId: node.foreign_id,
        countryLookup: node.country,
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
        foreignId: node.foreign_id,
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
        route: `Countries`,
        title: node.name,
      },
    })
  })

  // tags
  result.data.allTagsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/tags/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/tag.js`),
      context: {
        node,
        lookup: `/${node.name}/`,
        route: `Tags`,
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
        lookup: node.name || "DATA-MISSING",
        route: `Topics`,
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

  // ionos configuration wtf
  createRedirect({ fromPath: "/defaultsite", toPath: "/", isPermanent: true })
}
