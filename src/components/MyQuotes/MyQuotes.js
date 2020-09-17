import React, { useContext, useState, useEffect } from "react";
import { context } from "../../Context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function MyQuotes() {
  const { sayings } = useContext(context);
  const [filteredArray, setFilteredArray] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwt token");

      const res = await fetch(`http://localhost:5000/users/username`, {
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
  }, [sayings]);

  const editIcon = (
    <FontAwesomeIcon
      icon={faPencilAlt}
      className="text-danger edit-icon ml-3"
    />
  );

  return (
    <div className="container">
      <div>{username}'s quotes</div>
      {filteredArray.map(quote => {
        return (
          <li
            key={quote._id}
            style={{ listStyleType: "none" }}
            className="mb-5"
          >
            <div className="item d-flex">
              <h2 className="item">"{quote.content}"</h2>
              <Link to={`/edit/${quote._id}`}>{editIcon}</Link>
            </div>
          </li>
        );
        // return <Quote quote={m} key={index} isSignedIn={props.isSignedIn}/>;
      })}
    </div>
  );
}

export default MyQuotes;
