import React from "react";
import styles from "./sidebar.module.css";

import cx from "classnames";

export default ({ children, classNames }) => (
  <aside className={cx(classNames, styles.main)}>
    <div className={styles.topContent}>
      <h1 className={styles.rampega}>Rampega</h1>
      <p className={styles.est}>est. 2011</p>
    </div>
    <div className={styles.bottomContent}>
      <p className={styles.contentText}>hello</p>
      <p className={styles.bottomText}>Del testo inutile</p>
    </div>
  </aside>
);
