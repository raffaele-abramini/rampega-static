const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const escursioneTemplate = path.resolve('./src/templates/escursione.template.js')
    resolve(
      graphql(
        `
          {
            allContentfulEscursione {
              edges {
                node {
                  titolo
                  url
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulEscursione.edges
        posts.forEach(post => {
          createPage({
            path: `/escursioni/${post.node.url}/`,
            component: escursioneTemplate,
            context: {
              url: post.node.url,
            },
          })
        })
      })
    )
  })
}
