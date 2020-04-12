import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from "./escursione-preview.module.css";

export default ({ escursione }) => (
  <article>
    <Link to={`/escursioni/${escursione.url}`} className={styles.main}>
      <Img
        className={styles.img}
        alt=""
        fluid={escursione.immagineDiCopertina.fluid}
      />
      <div className={styles.text}>
        <h3 className={styles.title}>{escursione.titolo}</h3>
      </div>
    </Link>
  </article>
);
