import React, { useContext } from "react";
import { context } from "../../Context";
import { Link } from "react-router-dom";

function Settings(props) {
  const { isSignedIn } = props;
  const { user } = useContext(context);

  return (
    <div className="container p-3">
      <h1>Settings</h1>
      {isSignedIn && (
        <Link to={isSignedIn ? `/my_quotes/user/${user._id}` : ""}>
          My quotes
        </Link>
      )}
    </div>
  );
}

export default Settings;
