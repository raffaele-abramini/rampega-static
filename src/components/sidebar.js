import React from "react";
import * as styles from "./sidebar.module.css";
import { Link } from "gatsby";
import { AiOutlineArrowLeft } from "react-icons/ai";

import cx from "classnames";

export default ({ classNames, content, notaFooter, goBack }) => (
  <aside className={cx(classNames, styles.main)}>
    <div className={styles.topContent}>
      <h1 className={styles.rampega}>
        <Link to="/">Rampega</Link>
      </h1>
      <p className={styles.est}>est. 2011</p>
    </div>
    <div className={styles.bottomContent}>
      {goBack && (
        <Link to={`/`} className={styles.backLink}>
          <AiOutlineArrowLeft /> <span>Go back</span>
        </Link>
      )}
      {content && <p className={styles.contentText}>{content}</p>}
      <p className={styles.bottomText}>{notaFooter}</p>
    </div>
  </aside>
);
