import React from "react";
import "./base.css";
import Container from "./container";
import Sidebar from "./sidebar";
import styles from "./layout.module.css";

class Template extends React.Component {
  render() {
    const { children, location } = this.props;

    return (
      <Container>
        <Sidebar
          classNames={styles.sidebar}
          isIndex={location.pathname === "/"}
        />
        <div className={styles.mainColumn}>{children}</div>
      </Container>
    );
  }
}

export default Template;
