import React from "react";
import "./NavToggleButton.css";

const NavToggleButton = props => {
  const { isSideNavOpen, openSideNav } = props;
  const styles = {
    hamburgerIcon: {
      position: "absolute",
      zIndex: 2,
      cursor: "pointer"
    },
    line: {
      height: "3px",
      width: "20px",
      background: "white",
      transition: "all 0.3s ease"
    },
    lineTop: {
      transform: isSideNavOpen ? "rotate(50deg)" : "none",
      transformOrigin: "top left",
      marginBottom: "5px"
    },
    lineMiddle: {
      opacity: isSideNavOpen ? 0 : 1,
      transform: isSideNavOpen ? "translateX(-16px)" : "none"
    },
    lineBottom: {
      transform: isSideNavOpen ? "translateX(-1px) rotate(-50deg)" : "none",
      transformOrigin: "top left",
      marginTop: "5px"
    }
  };
  return (
    <div>
      <div id="hamburger-icon" onClick={openSideNav}>
        <div style={{ ...styles.line, ...styles.lineTop }} />
        <div style={{ ...styles.line, ...styles.lineMiddle }} />
        <div style={{ ...styles.line, ...styles.lineBottom }} />
      </div>
    </div>
  );
};

export default NavToggleButton;
