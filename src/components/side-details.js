import React from "react";
import styles from "./side-details.module.css";

export default ({
  escursione: { data, dislivello, location, durata },
  children,
}) => (
  <aside className={styles.main}>
    <p className={styles.header}>Cime raggiunte</p>
    {children}
    <p className={styles.header}>Dettagli</p>
    <dl className={styles.list}>
      <div className={styles.listItem}>
        <dt className={styles.dt}>Data</dt>{" "}
        <dd className={styles.dd}>{data}</dd>
      </div>
      <div className={styles.listItem}>
        <dt className={styles.dt}>Dislivello</dt>{" "}
        <dd className={styles.dd}>{dislivello}</dd>
      </div>
      <div className={styles.listItem}>
        <dt className={styles.dt}>Location</dt>{" "}
        <dd className={styles.dd}>{location}</dd>
      </div>
      <div className={styles.listItem}>
        <dt className={styles.dt}>Durata</dt>{" "}
        <dd className={styles.dd}>{durata}</dd>
      </div>
    </dl>
  </aside>
);
