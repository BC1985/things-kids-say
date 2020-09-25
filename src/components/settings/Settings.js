import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context";
import { Link } from "react-router-dom";
import { apiService } from "../../Services/apiServices";
import Spinner from "../Spinner/Spinner";

function Settings(props) {
  const { isSignedIn } = props;
  const { user, sayings } = useContext(context);
  const [quotesByUser, setQuotesByUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    const fetchData = async () => {
      let id = props.match.params.id;
      const userQuotes = await apiService.getQuotesByUser(id);
      setQuotesByUser(userQuotes);
    };
    fetchData();
  }, [sayings, props.match.params.id]);


  return (
    <div className="container p-3">
      <h1>Settings</h1>
      <div className="mt-3">
        {isSignedIn && (
          <Link to={`/my_quotes/user/${user._id}`}>My quotes </Link>
        )}
        <span>{isLoading ? <Spinner /> : quotesByUser.length}</span>
      </div>
    </div>
  );
}

export default Settings;
