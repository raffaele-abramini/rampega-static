import React from "react";

export default ({ children }) => (
  <div
    style={{
      maxWidth: "100%",
      margin: "0 auto",
      display: "flex",
    }}
  >
    {children}
  </div>
);
