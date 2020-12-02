/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    `gatsby-theme-material-ui`,
    // {
    //   resolve: `gatsby-plugin-sitemap`,
    //   options: {
    //     sitemapSize: 5000,
    //   },
    // },
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: `data`,
        engine: `flexsearch`,
        engineOptions: {
          encode: `simple`,
          tokenize: `forward`,
          threshold: 6,
          resolution: 2,
          cache: true,
          worker: true,
        },
        query: `
          {
            allBeneficiariesJson {
              nodes {
                beneficiary_name
                schema
              }
            }
            allProjectsJson {
              nodes {
                purpose
              }
            }
            allProgrammesJson {
              nodes {
                programme
              }
            }
          }
        `,
        ref: `id`,
        index: [`name`],
        store: [`id`, `name`, `schema`],
        normalizer: ({ data }) => [
          ...data.allBeneficiariesJson.nodes.map((node, i) => ({
            id: parseInt(`1${i}`),
            name: node.beneficiary_name,
            schema: node.schema[0].toLowerCase(),
          })),
          ...data.allProjectsJson.nodes.map((node, i) => ({
            id: parseInt(`2${i}`),
            name: node.purpose,
            schema: `j`,
          })),
          ...data.allProgrammesJson.nodes.map((node, i) => ({
            id: parseInt(`3${i}`),
            name: node.programme,
            schema: `r`,
          })),
        ],
      },
    },
  ],
  siteMetadata: {
    title: `Face Off Grant`,
    siteUrl: `http://localhost:8000/`,
  },
  pathPrefix: `/fog-platform`,
}
