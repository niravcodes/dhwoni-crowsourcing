import React from "react";
import ReactLoading from "react-loading";
import DhwoniLogo from "./DhwoniLogo";

export default function AppBody({ children, loading = false }) {
  return (
    <div
      style={{
        boxShadow: "0px 0px 15px #00000050",
        borderRadius: 10,
        boxSizing: "border-box",
        padding: 30,
        marginTop: 30,
        background: "#f3f3f3",
        position: loading ? "relative" : undefined,
        overflow: "hidden",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            opacity: 0.8,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading color="black" />
        </div>
      )}
      <DhwoniLogo />
      {children}
    </div>
  );
}
