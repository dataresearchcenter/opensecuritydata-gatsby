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
        // engineOptions: {
        //   encode: `advanced`,
        //   tokenize: `forward`,
        //   threshold: 1,
        //   resolution: 5,
        //   cache: true,
        //   async: true,
        //   worker: 2,
        // },
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
                iso
                name
              }
            }
            topics: allTopicsJson {
              nodes {
                key
                name
              }
            }
          }
        `,
        ref: `id`,
        index: [`name`],
        store: [`id`, `name`, `schema`, `key`],
        normalizer: ({
          data: { beneficiaries, projects, programmes, countries, topics },
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
          ...countries.nodes.map(({ name, iso }, i) => ({
            id: parseInt(`4${i}`),
            name,
            schema: `n`,
            key: iso,
          })),
          ...topics.nodes.map(({ name, key }, i) => ({
            id: parseInt(`5${i}`),
            name,
            schema: `t`,
            key,
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
