import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import * as styles from "./escursione-preview.module.css";

export default ({ escursione: { url, immagineDiCopertina, titolo } }) => (
  <article>
    <Link to={`/escursioni/${url}`} className={styles.main}>
      {immagineDiCopertina && (
        <Img className={styles.img} alt="" fluid={immagineDiCopertina.fluid} />
      )}
      <div className={styles.text}>
        <h3 className={styles.title}>{titolo}</h3>
      </div>
    </Link>
  </article>
);
