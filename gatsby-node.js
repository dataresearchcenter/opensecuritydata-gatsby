const slugify = require(`slugify`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

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
            total_amount
          }
        }
      }
      allProjectsJson {
        edges {
          node {
            id
            name
            summary
            description
            programme
            beneficiaries
            total_amount
          }
        }
      }
      allBeneficiariesJson {
        edges {
          node {
            id
            name
            country
            schema
            programmes
            projects
            payments
            total_amount
            endDate
            startDate
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
            total_amount
          }
        }
      }
      allTopicsJson {
        edges {
          node {
            ancestor
            descendants
            key
            name
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
      path: `/programme/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/programme.js`),
      context: {
        node,
        lookup: node.name,
        route: `Programmes`,
        title: node.name,
      },
    })
  })

  // projects
  result.data.allProjectsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/project/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/project.js`),
      context: {
        node,
        projectLookup: node.name,
        programmeLookup: node.programme,
        topicsLookup: (node.summary || "")
          .split("---\nTopics:\n")
          .pop()
          .split(";")
          .map(t => t.substring(1)),
        route: `Projects`,
        title: node.name,
      },
    })
  })

  // beneficiaries
  result.data.allBeneficiariesJson.edges.forEach(({ node }) => {
    createPage({
      path: `/beneficiary/${slugify(node.name)}`,
      component: require.resolve(`./src/templates/beneficiary.js`),
      context: {
        node,
        paymentsLookup: node.id,
        countryLookup: node.country,
        route: `Beneficiaries`,
        title: node.name,
      },
    })
  })

  // countries
  result.data.allCountriesJson.edges.forEach(({ node }) => {
    createPage({
      path: `/country/${node.iso}`,
      component: require.resolve(`./src/templates/country.js`),
      context: {
        node,
        lookup: node.iso,
        route: `Countries`,
        title: node.name,
      },
    })
  })

  // topics
  const pathSlugify = path =>
    path
      .split("/")
      .map(p => slugify(p))
      .join("/")
  result.data.allTopicsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/topic/${pathSlugify(node.key)}`,
      component: require.resolve(`./src/templates/topic.js`),
      context: {
        node,
        ancestorLookup: node.ancestor || "",
        descendantsLookup: `/^${node.key}/`,
        projectsLookup: `/${node.key.replace("/", "\\/")}/`,
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
}
