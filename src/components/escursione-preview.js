import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import * as styles from "./escursione-preview.module.css";

export default ({ escursione: { url, immagineDiCopertina, titolo, data } }) => {
  const image = getImage(immagineDiCopertina);
  return (
    <article>
      <Link to={`/escursioni/${url}`} className={styles.main}>
        {immagineDiCopertina && (
          <GatsbyImage className={styles.img} image={image} alt={titolo} />
        )}
        <div className={styles.text}>
          <h3 className={styles.title}>{titolo}</h3>
          <p className={styles.date}>{new Date(data).getFullYear()}</p>
        </div>
      </Link>
    </article>
  );
};
