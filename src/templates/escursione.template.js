import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import { getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Hero from "../components/hero";
import SideDetails from "../components/side-details";
import * as styles from "./escursione.template.module.css";
import { Gallery, Item } from "react-photoswipe-gallery";

class EscursioneTemplate extends React.Component {
  render() {
    /**
     * @type ContentfulEscursione
     */
    const escursione = get(this.props, "data.contentfulEscursione");
    // const image = getImage()

    const { gallery, resoconto } = escursione;
    const {
      nomeSito,
      notaFooter: { notaFooter },
    } = get(this, "props.data.contentfulSettings");

    return (
      <Layout location={this.props.location} notaFooter={notaFooter} goBack>
        <Helmet title={`${escursione.titolo} | ${nomeSito}`} />
        <Hero escursione={escursione} />
        <div className={styles.main}>
          <div className={styles.textColumn}>
            <div className={styles.textColumnInner}>
              {resoconto && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: resoconto.childMarkdownRemark.html,
                  }}
                />
              )}
            </div>
          </div>
          <div className={styles.galleryColumn}>
            <SideDetails escursione={escursione} />
            <div
              className={styles.gallery}
              style={{ "--totalSlides": escursione.gallery?.length || 0 }}
            >
              <Gallery
                options={{
                  initialZoomLevel: "fit",
                  showHideAnimationType: "fade",
                }}
              >
                {escursione.gallery?.map((galleryItem, i) => {
                  const full = getImage(galleryItem.full);
                  const preview = getImage(galleryItem.preview);
                  return (
                    <Item
                      original={full.images.fallback.src}
                      originalSrcset={full.images.sources[0]?.srcSet}
                      width={full.width}
                      height={full.height}
                      key={galleryItem.filename}
                    >
                      {({ ref, open }) => (
                        <div className={styles.galleryElement}>
                          <img
                            className={styles.galleryElementLink}
                            alt={galleryItem.title}
                            srcSet={preview.images.sources[0]?.srcSet}
                            sizes={preview.images.sources[0]?.sizes}
                            ref={ref}
                            onClick={open}
                          />
                        </div>
                      )}
                    </Item>
                  );
                })}
              </Gallery>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default EscursioneTemplate;

export const pageQuery = graphql`
  query EscursioneByUrl($url: String!) {
    contentfulEscursione(url: { eq: $url }) {
      titolo
      data(formatString: "MMMM Do, YYYY")
      immagineDiCopertina {
        gatsbyImageData(width: 1180, layout: FULL_WIDTH)
      }
      location
      dislivello
      puntoDiPartenza
      durata
      rifugi
      cimeRaggiunte
      gallery {
        description
        filename
        preview: gatsbyImageData(
          width: 300
          height: 200
          placeholder: BLURRED
          resizingBehavior: CROP
        )
        full: gatsbyImageData(width: 1400, quality: 90, placeholder: BLURRED)
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
