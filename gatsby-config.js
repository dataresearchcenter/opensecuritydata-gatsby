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
            beneficiaries: allBeneficiariesJson {
              nodes {
                name
                schema
              }
            }
            projects: allProjectsJson {
              nodes {
                name
              }
            }
            programmes: allProgrammesJson {
              nodes {
                name
              }
            }
            countries: allCountriesJson {
              nodes {
                name
              }
            }
          }
        `,
        ref: `id`,
        index: [`name`],
        store: [`id`, `name`, `schema`],
        normalizer: ({
          data: { beneficiaries, projects, programmes, countries },
        }) => [
          ...beneficiaries.nodes.map(({ name, schema }, i) => ({
            id: parseInt(`1${i}`),
            name,
            schema: schema[0].toLowerCase(),
          })),
          ...projects.nodes.map(({ name }, i) => ({
            id: parseInt(`2${i}`),
            name,
            schema: `j`,
          })),
          ...programmes.nodes.map(({ name }, i) => ({
            id: parseInt(`3${i}`),
            name,
            schema: `r`,
          })),
          ...countries.nodes.map(({ name }, i) => ({
            id: parseInt(`4${i}`),
            name,
            schema: `n`,
          })),
        ],
      },
    },
  ],
  siteMetadata: {
    title: `Face Off Grant`,
    siteUrl: `http://localhost:8000/`,
  },
}
