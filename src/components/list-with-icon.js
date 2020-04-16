import React from "react";
import styles from "./list-with-icon.module.css";

export default ({ list, icon: Icon }) => {
  return (
    <div className={styles.list}>
      {list.map((item) => (
        <div className={styles.listItem}>
          <span className={styles.icon}>
            <Icon />
          </span>
          {item}
        </div>
      ))}
    </div>
  );
};
