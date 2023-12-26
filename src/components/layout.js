import React from "react";
import "./base.css";
import "photoswipe/dist/photoswipe.css";
import Container from "./container";
import Sidebar from "./sidebar";
import * as styles from "./layout.module.css";

class Template extends React.Component {
  render() {
    const { children, sidebarContent = "", notaFooter, goBack } = this.props;

    return (
      <Container>
        <Sidebar
          classNames={styles.sidebar}
          content={sidebarContent}
          notaFooter={notaFooter}
          goBack={goBack}
        />
        <div className={styles.mainColumn}>{children}</div>
      </Container>
    );
  }
}

export default Template;
