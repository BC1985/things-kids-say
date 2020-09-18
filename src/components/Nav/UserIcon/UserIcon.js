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

  let username = props.username.username;
  let userInitial = String(username).charAt(0);

  return (
    <>
      {/* Hide icon as long as username is "undefined" */}
      {userInitial !== "u" && (
        <div className="user-icon mr-2" style={iconStyle}>
          <div
            className="d-flex justify-content-center"
            style={{ fontStretch: "expanded" }}
          >
            {userInitial}
          </div>
        </div>
      )}
    </>
  );
}

export default UserIcon;
