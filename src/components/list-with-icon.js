import React from "react";
import * as styles from "./list-with-icon.module.css";

export default ({ list, icon: Icon }) => {
  return (
    <div className={styles.list}>
      {list.map((item) => (
        <div className={styles.listItem} key={item}>
          <span className={styles.icon}>
            <Icon />
          </span>
          {item}
        </div>
      ))}
    </div>
  );
};
