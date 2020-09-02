import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./Quote.css";

const editIcon = (
  <FontAwesomeIcon icon={faPencilAlt} className="text-danger edit-icon ml-3" />
);

const Quote = ({ sayings }) => {
  return sayings.map(quote => {
    return (
      <li key={quote._id} style={{ listStyleType: "none" }} className="mb-5">
        <div className="item d-flex">
          <h2 className="item">"{quote.content}"</h2>
          <Link to={`/edit/${quote._id}`}>{editIcon}</Link>
        </div>
        <h3 style={{ color: "gray" }}>
          {quote.kid_name}, age {quote.age}
        </h3>
        <p className="ml-4">Submitted by {quote.username}</p>
      </li>
    );
  });
};

export default Quote;
