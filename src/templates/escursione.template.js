import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Hero from "../components/hero";
import styles from "./escursione.template.module.css";
import FsLightbox from "fslightbox-react";

class EscursioneTemplate extends React.Component {
  state = {
    toggler: false,
    slide: 1,
  };

  render() {
    const escursione = get(this.props, "data.contentfulEscursione");
    const siteTitle = get(this, "props.data.contentfulSettings.nomeSito");

    const { toggler, slide } = this.state;

    return (
      <Layout location={this.props.location}>
        <Helmet title={`${escursione.titolo} | ${siteTitle}`} />
        <Hero escursione={escursione} />
        <div className={styles.main}>
          <div className={styles.textColumn}>
            <div className={styles.textColumnInner}>
              <div
                dangerouslySetInnerHTML={{
                  __html: escursione.resoconto.childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
          <div className={styles.galleryColumn}>
            <ul className={styles.gallery}>
              {escursione.gallery.map((g, i) => (
                <li key={i} className={styles.galleryElement}>
                  <button
                    type="button"
                    className={styles.galleryElementLink}
                    onClick={(e) => this.handleGalleryClick(i, e)}
                  >
                    <Img alt={g.title} fluid={g.fluid} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <FsLightbox
          toggler={toggler}
          sources={escursione.gallery.map((g) => g.fixed.src)}
          slide={slide}
        />
      </Layout>
    );
  }
  handleGalleryClick = (i, e) => {
    e.preventDefault();
    this.setState((state) => ({
      toggler: !state.toggler,
      slide: i + 1,
    }));
  };
}

export default EscursioneTemplate;

export const pageQuery = graphql`
  query EscursioneByUrl($url: String!) {
    contentfulEscursione(url: { eq: $url }) {
      titolo
      data(formatString: "MMMM Do, YYYY")
      immagineDiCopertina {
        fluid(maxWidth: 1180, background: "rgb:999999") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      location
      dislivello
      gallery {
        fluid(maxWidth: 1180, background: "rgb:999999") {
          ...GatsbyContentfulFluid_tracedSVG
        }
        fixed {
          src
        }
      }
      resoconto {
        childMarkdownRemark {
          html
        }
      }
    }

    contentfulSettings(settings: { eq: "settings" }) {
      nomeSito
    }
  }
`;
