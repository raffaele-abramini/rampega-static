import React from "react";
import * as styles from "./side-details.module.css";
import { GiMountaintop } from "react-icons/gi";
import { GiBarracksTent } from "react-icons/gi";
import ListWithIcon from "./list-with-icon";

export default ({
  escursione: {
    data,
    dislivello,
    location,
    durata,
    cimeRaggiunte,
    puntoDiPartenza,
    rifugi,
  },
}) => (
  <aside className={styles.main}>
    {cimeRaggiunte && (
      <>
        <p className={styles.header}>Cime raggiunte</p>
        <ListWithIcon icon={GiMountaintop} list={cimeRaggiunte} />
      </>
    )}
    {rifugi && (
      <>
        <p className={styles.header}>Rifugi</p>
        <ListWithIcon icon={GiBarracksTent} list={rifugi} />
      </>
    )}
    <div className={styles.dettagliArea}>
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
          <dt className={styles.dt}>Punto di partenza</dt>{" "}
          <dd className={styles.dd}>{puntoDiPartenza}</dd>
        </div>
        {durata && (
          <div className={styles.listItem}>
            <dt className={styles.dt}>Durata</dt>{" "}
            <dd className={styles.dd}>{durata}</dd>
          </div>
        )}
      </dl>
    </div>
  </aside>
);
