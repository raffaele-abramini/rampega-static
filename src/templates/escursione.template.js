import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class EscursioneTemplate extends React.Component {
  render() {
    const escursione = get(this.props, 'data.contentfulEscursione')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${escursione.titolo} | ${siteTitle}`} />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={escursione.title}
              fluid={escursione.immagineDiCopertina.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{escursione.titolo}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {escursione.data}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: escursione.resoconto.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default EscursioneTemplate

export const pageQuery = graphql`query EscursioneByUrl($url: String!) {
  contentfulEscursione(url: { eq: $url }) {
      titolo
      data(formatString: "MMMM Do, YYYY")
      immagineDiCopertina {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      resoconto {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
