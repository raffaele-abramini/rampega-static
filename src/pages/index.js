import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import EscursionePreview from '../components/escursione-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulEscursione.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <h2 className="section-headline">Escursioni!</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <EscursionePreview escursione={node}/>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulEscursione(sort: { fields: [data], order: DESC }) {
      edges {
        node {
          immagineDiCopertina {
            id
            fluid(maxHeight: 200, maxWidth: 200) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          titolo
          url
          resoconto {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
