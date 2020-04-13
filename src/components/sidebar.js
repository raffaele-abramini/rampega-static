import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "gatsby";

import cx from "classnames";

export default ({ children, classNames, isIndex }) => (
  <aside className={cx(classNames, styles.main)}>
    <div className={styles.topContent}>
      <h1 className={styles.rampega}>
        <Link>Rampega</Link>
      </h1>
      <p className={styles.est}>est. 2011</p>
    </div>
    <div className={styles.bottomContent}>
      {isIndex && (
        <p className={styles.contentText}>
          Rampega da sempre si distingue dagli altri siti di e per
          escursionisti.
        </p>
      )}
      <p className={styles.bottomText}>Eccoci qua</p>
    </div>
  </aside>
);
