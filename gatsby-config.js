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
    // `gatsby-plugin-netlify-cms`,
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
                legalForm
              }
            }
            beneficiaryGroups: allBeneficiaryGroupsJson {
              nodes {
                name
              }
            }
            projects: allProjectsJson {
              nodes {
                name
                description
              }
            }
            programs: allProgramsJson {
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
            tags: allTagsJson {
              nodes {
                name
              }
            }
            topics: allTopicsJson {
              nodes {
                name
              }
            }
            euroscivoc: allEuroscivocJson {
              nodes {
                key
                name
              }
            }
          }
        `,
        ref: `id`,
        index: [`name`, `description`],
        store: [`id`, `name`, `schema`, `key`],
        normalizer: ({
          data: {
            beneficiaries,
            beneficiaryGroups,
            projects,
            programs,
            countries,
            tags,
            topics,
            euroscivoc,
          },
        }) => [
          ...beneficiaries.nodes.map(({ name, legalForm }, i) => ({
            id: parseInt(`1${i}`),
            name,
            schema: legalForm,
          })),
          ...beneficiaryGroups.nodes.map(({ name }, i) => ({
            id: parseInt(`2${i}`),
            name,
            schema: `g`,
          })),
          ...projects.nodes.map(({ name, description }, i) => ({
            id: parseInt(`3${i}`),
            name,
            description,
            schema: `p`,
          })),
          ...programs.nodes.map(({ name, description }, i) => ({
            id: parseInt(`4${i}`),
            name,
            description,
            schema: `r`,
          })),
          ...countries.nodes.map(({ name, iso }, i) => ({
            id: parseInt(`5${i}`),
            name,
            schema: `c`,
            key: iso,
          })),
          ...tags.nodes.map(({ name }, i) => ({
            id: parseInt(`8${i}`),
            name,
            schema: `k`,
          })),
          ...topics.nodes.map(({ name, key }, i) => ({
            id: parseInt(`6${i}`),
            name,
            schema: `t`,
          })),
          ...euroscivoc.nodes.map(({ name, key }, i) => ({
            id: parseInt(`7${i}`),
            name,
            schema: `e`,
            key,
          })),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-matomo`,
      options: {
        siteId: 2,
        matomoUrl: `https://matomo.statewatch.org/matomo`,
        siteUrl: `https://opensecuritydata.eu`,
        matomoPhpScript: `matomo.php`,
        matomoJsScript: `matomo.js`,
      },
    },
    `gatsby-plugin-client-side-redirect`, // keep it in last in list
  ],
  siteMetadata: {
    title: `Open Security Data Europe`,
    siteUrl: `http://localhost:8000/`,
  },
}
