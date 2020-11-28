const slugify = require("slugify")
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
            programme
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
            purpose
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
            beneficiary_name
            beneficiary_id
            programmes
            projects
            schema
            startDate
            total_amount
            total_payments
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
      path: `/programme/${slugify(node.programme)}/`,
      component: require.resolve(`./src/templates/programme.js`),
      context: {
        node,
        lookup: node.programme,
        route: "Programmes",
        title: node.programme,
      },
    })
  })

  // projects
  result.data.allProjectsJson.edges.forEach(({ node }) => {
    createPage({
      path: `/project/${slugify(node.purpose)}/`,
      component: require.resolve(`./src/templates/project.js`),
      context: {
        node,
        projectLookup: node.purpose,
        programmeLookup: node.programme,
        route: "Projects",
        title: node.purpose,
      },
    })
  })

  // beneficiaries
  result.data.allBeneficiariesJson.edges.forEach(({ node }) => {
    createPage({
      path: `/beneficiary/${slugify(node.beneficiary_name)}/`,
      component: require.resolve(`./src/templates/beneficiary.js`),
      context: {
        node,
        lookup: node.beneficiary_id,
        route: "Beneficiaries",
        title: node.beneficiary_name,
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
