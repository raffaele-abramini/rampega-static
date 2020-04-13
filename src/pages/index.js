import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import styles from "./index.module.css";
import EscursionePreview from "../components/escursione-preview";

class RootIndex extends React.Component {
  render() {
    const {
      nomeSito,
      notaFooter: { notaFooter },
      descrizioneHomepage: { descrizioneHomepage },
    } = get(this, "props.data.contentfulSettings");
    const posts = get(this, "props.data.allContentfulEscursione.edges");

    return (
      <Layout
        location={this.props.location}
        sidebarContent={descrizioneHomepage}
        notaFooter={notaFooter}
      >
        <div style={{ background: "#fff" }}>
          <Helmet title={nomeSito} />
          <div className="wrapper">
            <ul className={styles.grid}>
              {posts.map(({ node }) => {
                return (
                  <li key={node.url} className={styles.gridElement}>
                    <EscursionePreview escursione={node} />
                  </li>
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
            fluid(maxHeight: 560, maxWidth: 800) {
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

    contentfulSettings(settings: { eq: "settings" }) {
      nomeSito
      descrizione {
        descrizione
      }
      descrizioneHomepage {
        descrizioneHomepage
      }
      notaFooter {
        notaFooter
      }
    }
  }
`;
