import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./hero.module.css";

export default ({ escursione: { titolo, immagineDiCopertina } }) => {
  const image = getImage(immagineDiCopertina)
  return (
    <div className={styles.hero}>
      {immagineDiCopertina && (
        <GatsbyImage
          className={styles.heroImage}
          alt={titolo}
          image={image}
        />
      )}
      <div className={styles.heroDetails}>
        <h1 className={styles.heroTitle}>{titolo}</h1>
      </div>
    </div>
  )
};
