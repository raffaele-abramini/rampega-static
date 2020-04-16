import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import Hero from "../components/hero";
import SideDetails from "../components/side-details";
import styles from "./escursione.template.module.css";
import Lightbox from "react-image-lightbox";
import { GiMountaintop } from "react-icons/gi";

class EscursioneTemplate extends React.Component {
  state = { photoIndex: 0, isOpen: false };

  render() {
    /**
     * @type ContentfulEscursione
     */
    const escursione = get(this.props, "data.contentfulEscursione");

    const { gallery } = escursione;
    const {
      nomeSito,
      notaFooter: { notaFooter },
    } = get(this, "props.data.contentfulSettings");

    const { photoIndex, isOpen } = this.state;

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
            <SideDetails escursione={escursione}>
              {escursione.cimeRaggiunte && (
                <div className={styles.cimeRaggiunte}>
                  {escursione.cimeRaggiunte.map((c) => (
                    <div className={styles.cimaRaggiunta}>
                      <span className={styles.cimaIcon}>
                        <GiMountaintop />
                      </span>
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </SideDetails>
            <ul className={styles.gallery}>
              {escursione.gallery &&
                escursione.gallery.map((g, i) => (
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
            wrapperClassName={styles.slideshow}
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
            enableZoom
            imagePadding={56}
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
      durata
      cimeRaggiunte
      gallery {
        fluid(maxWidth: 300, maxHeight: 200, background: "rgb:999999") {
          ...GatsbyContentfulFluid_tracedSVG
        }
        description
        fixed(width: 1400, quality: 90) {
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
