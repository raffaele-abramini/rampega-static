import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout";
import Hero from "../components/hero";
import SideDetails from "../components/side-details";
import * as styles from "./escursione.template.module.css";
// import Lightbox from "react-image-lightbox";

class EscursioneTemplate extends React.Component {
  state = { photoIndex: 0, isOpen: false };

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

    const { photoIndex, isOpen } = this.state;

    return (
      <Layout location={this.props.location} notaFooter={notaFooter}>
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
            <ul
              className={styles.gallery}
              style={{ "--totalSlides": escursione.gallery?.length || 0 }}
            >
              {escursione.gallery?.map((image, i) => (
                <li key={image.filename} className={styles.galleryElement}>
                  <button
                    type="button"
                    className={styles.galleryElementLink}
                    onClick={(e) => this.handleGalleryClick(i, e)}
                  >
                    <GatsbyImage alt={image.title} image={getImage(image.preview)} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*{isOpen && gallery?.length && (*/}
        {/*  <Lightbox*/}
        {/*    wrapperClassName={styles.slideshow}*/}
        {/*    mainSrc={gallery[photoIndex].fixed.src}*/}
        {/*    nextSrc={gallery[(photoIndex + 1) % gallery.length].fixed.src}*/}
        {/*    prevSrc={*/}
        {/*      gallery[(photoIndex + gallery.length - 1) % gallery.length].fixed*/}
        {/*        .src*/}
        {/*    }*/}
        {/*    imageTitle={gallery[photoIndex].description}*/}
        {/*    onCloseRequest={() => this.setState({ isOpen: false })}*/}
        {/*    onMovePrevRequest={() =>*/}
        {/*      this.setState({*/}
        {/*        photoIndex: (photoIndex + gallery.length - 1) % gallery.length,*/}
        {/*      })*/}
        {/*    }*/}
        {/*    onMoveNextRequest={() =>*/}
        {/*      this.setState({*/}
        {/*        photoIndex: (photoIndex + 1) % gallery.length,*/}
        {/*      })*/}
        {/*    }*/}
        {/*    captions={gallery.map((g) => g.description)}*/}
        {/*    enableZoom*/}
        {/*    imagePadding={window.innerWidth > 767 ? 65 : 5}*/}
        {/*  />*/}
        {/*)}*/}
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
              gatsbyImageData(
                  width: 1180
                  layout: FULL_WIDTH
              )
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
          full: gatsbyImageData(
              width: 1400
              quality: 90
              placeholder: BLURRED
          )
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
