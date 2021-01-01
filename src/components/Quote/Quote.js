import React from "react";
import "./Quote.css";

const Quote = ({ quote }) => {
  return (
    <ul>
      <li key={quote._id} style={{ listStyleType: "none" }} className="mb-5">
        <div className="item d-flex">
          <h2 className="item">"{quote.content}"</h2>
        </div>
        <h3 style={{ color: "gray" }}>
          {quote.kid_name}, age {quote.age}
        </h3>
        {<p className="ml-4">Submitted by {quote.username}</p>}
      </li>
    </ul>
  );
};

export default Quote;
