import React from "react";
import Img from "gatsby-image";

import styles from "./hero.module.css";

export default ({
  escursione: { titolo, immagineDiCopertina, data, dislivello, location },
}) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={titolo}
      fluid={immagineDiCopertina.fluid}
    />
    <div className={styles.heroDetails}>
      <h1 className={styles.heroTitle}>{titolo}</h1>

      <div className={styles.sideDetails}>
        <p className={styles.sideDetailsP}>{data}</p>
        <p className={styles.sideDetailsP}>{dislivello}</p>
        <p className={styles.sideDetailsP}>{location}</p>
      </div>
    </div>
  </div>
);
