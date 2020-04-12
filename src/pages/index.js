import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import styles from "./index.module.css";
import EscursionePreview from "../components/escursione-preview";

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const posts = get(this, "props.data.allContentfulEscursione.edges");

    return (
      <Layout location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <ul className={styles.grid}>
              {posts.map(({ node }) => {
                return (
                  <>
                    <li key={node.slug} className={styles.gridElement}>
                      <EscursionePreview escursione={node} />
                    </li>

                    <li key={node.slug} className={styles.gridElement}>
                      <EscursionePreview escursione={node} />
                    </li>

                    <li key={node.slug} className={styles.gridElement}>
                      <EscursionePreview escursione={node} />
                    </li>

                    <li key={node.slug} className={styles.gridElement}>
                      <EscursionePreview escursione={node} />
                    </li>

                    <li key={node.slug} className={styles.gridElement}>
                      <EscursionePreview escursione={node} />
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

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
`;
