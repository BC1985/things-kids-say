import React from "react";

function UserIcon(props) {
  
  const iconStyle = {
    borderRadius: "50%",
    width: "2.5em",
    background: "#9eb3c3",
    color: "white",
    padding: "10px",
    fontSize: "1.2em",
  };

  let userInitial = props.username.charAt(0);
  return (
    <div className="user-icon mr-2" style={iconStyle}>
      <div
        className="d-flex justify-content-center"
        style={{ fontStretch: "expanded" }}
      >
        {userInitial}
      </div>
    </div>
  );
}

export default UserIcon;
