import React from "react";
import Img from "gatsby-image";

import styles from "./hero.module.css";

export default ({ escursione: { titolo, immagineDiCopertina } }) => (
  <div className={styles.hero}>
    {immagineDiCopertina && (
      <Img
        className={styles.heroImage}
        alt={titolo}
        fluid={immagineDiCopertina.fluid}
      />
    )}
    <div className={styles.heroDetails}>
      <h1 className={styles.heroTitle}>{titolo}</h1>
    </div>
  </div>
);
