import React, { useContext, useState, useEffect } from "react";
import { context } from "../../Context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner/Spinner";

function MyQuotes(props) {
  const { sayings } = useContext(context);
  const [filteredArray, setFilteredArray] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userId = props.match.params.id;
    const fetchData = async () => {
      const token = localStorage.getItem("jwt token");

      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      let data = await res.json();
      let user = data.username;
      setUsername(user);
      let userQuotes = sayings.filter(x => x.username === user);
      setFilteredArray(userQuotes);
    };
    fetchData();
  }, [sayings, props.match.params.id]);

  const editIcon = (
    <FontAwesomeIcon
      icon={faPencilAlt}
      className="text-danger edit-icon ml-3"
    />
  );

  const QuotesList = () => {
    return (
      <div>
        <h1 className="mb-4">
          {username}'s quotes: ({filteredArray.length})
        </h1>
        {filteredArray.map(quote => {
          return (
            <li
              key={quote._id}
              style={{ listStyleType: "none" }}
              className="mb-3"
            >
              <div className="item d-flex">
                <p className="item">"{quote.content}"</p>
                <Link to={`/edit/${quote._id}`}>{editIcon}</Link>
              </div>
            </li>
          );
        })}
      </div>
    );
  };
  return (
    <div className="container mt-3">
      {filteredArray.length > 0 ? <QuotesList /> : <Spinner />}
    </div>
  );
}

export default MyQuotes;
