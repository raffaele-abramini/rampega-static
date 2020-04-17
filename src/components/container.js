import React from "react";
import styles from "./layout.module.css";
export default ({ children }) => (
  <div
    style={{
      maxWidth: "100%",
      margin: "0 auto",
    }}
    className={styles.container}
  >
    {children}
  </div>
);
