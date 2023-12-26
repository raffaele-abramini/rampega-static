import React from "react";
import * as styles from "./sidebar.module.css";
import { Link } from "gatsby";

import cx from "classnames";

export default ({ classNames, content, notaFooter }) => (
  <aside className={cx(classNames, styles.main)}>
    <div className={styles.topContent}>
      <h1 className={styles.rampega}>
        <Link to="/">Rampega</Link>
      </h1>
      <p className={styles.est}>est. 2011</p>
    </div>
    <div className={styles.bottomContent}>
      {content && <p className={styles.contentText}>{content}</p>}
      <p className={styles.bottomText}>{notaFooter}</p>
    </div>
  </aside>
);
