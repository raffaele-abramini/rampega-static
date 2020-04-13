import React from "react";
import "./base.css";
import Container from "./container";
import Sidebar from "./sidebar";
import styles from "./layout.module.css";

class Template extends React.Component {
  render() {
    const { children, sidebarContent = "", notaFooter } = this.props;

    return (
      <Container>
        <Sidebar
          classNames={styles.sidebar}
          content={sidebarContent}
          notaFooter={notaFooter}
        />
        <div className={styles.mainColumn}>{children}</div>
      </Container>
    );
  }
}

export default Template;
