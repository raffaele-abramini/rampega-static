import React from "react";
import { Link } from "gatsby";
import "../components/base.css";

export default () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      404, dang it. Go&nbsp;
      <Link to={"/"}>back</Link>.
    </div>
  );
};
