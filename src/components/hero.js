import React from "react";
import Img from "gatsby-image";

import styles from "./hero.module.css";

export default ({ escursione }) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={escursione.title}
      fluid={escursione.immagineDiCopertina.fluid}
    />
    <div className={styles.heroDetails}>
      <h1 className={styles.heroTitle}>{escursione.titolo}</h1>
    </div>
  </div>
);
