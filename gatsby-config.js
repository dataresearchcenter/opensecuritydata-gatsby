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
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "beneficiaries",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allBeneficiariesJson {
              nodes {
                id
                beneficiary_name
              }
            }
          }
        `,
        ref: "id",
        index: ["name"],
        // store: ["id", "path", "title"],
        normalizer: ({ data }) =>
          data.allBeneficiariesJson.nodes.map(node => ({
            id: node.id,
            name: node.beneficiary_name,
          })),
      },
    },
  ],
  siteMetadata: {
    title: "Follow Off Grant",
  },
  pathPrefix: "/fog-platform",
}
