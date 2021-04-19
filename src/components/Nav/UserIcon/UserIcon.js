import React from "react";

function UserIcon({username}) {
  const iconStyle = {
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    background: "#9eb3c3",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Lato",
  };

  let userInitial = String(username).charAt(0).toUpperCase();

  return (
    <>
      {/* Hide icon as long as username is "undefined" */}
      {userInitial !== "u" && (
        <div className="user-icon" style={iconStyle}>
          {userInitial}
        </div>
      )}
    </>
  );
}

export default UserIcon;
