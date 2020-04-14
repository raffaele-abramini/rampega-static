import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Hero from "../components/hero";
import styles from "./escursione.template.module.css";
import Lightbox from "react-image-lightbox";

class EscursioneTemplate extends React.Component {
  state = { photoIndex: 0, isOpen: false };

  render() {
    const escursione = get(this.props, "data.contentfulEscursione");

    const { gallery } = escursione;
    const {
      nomeSito,
      notaFooter: { notaFooter },
    } = get(this, "props.data.contentfulSettings");

    const { photoIndex, isOpen } = this.state;

    console.log(gallery[0]);
    return (
      <Layout location={this.props.location} notaFooter={notaFooter}>
        <Helmet title={`${escursione.titolo} | ${nomeSito}`} />
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

        {isOpen && gallery?.length && (
          <Lightbox
            mainSrc={gallery[photoIndex].fixed.src}
            nextSrc={gallery[(photoIndex + 1) % gallery.length].fixed.src}
            prevSrc={
              gallery[(photoIndex + gallery.length - 1) % gallery.length].fixed
                .src
            }
            imageTitle={gallery[photoIndex].description}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + gallery.length - 1) % gallery.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % gallery.length,
              })
            }
            captions={gallery.map((g) => g.description)}
            animationDisabled={false}
            enableZoom={false}
          />
        )}
      </Layout>
    );
  }
  handleGalleryClick = (i, e) => {
    e.preventDefault();
    this.setState({
      isOpen: true,
      photoIndex: i,
    });
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
        fluid(maxWidth: 300, background: "rgb:999999") {
          ...GatsbyContentfulFluid_tracedSVG
        }
        description
        fixed(width: 1400) {
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
      notaFooter {
        notaFooter
      }
    }
  }
`;
