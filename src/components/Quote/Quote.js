import React from "react";

const Quote = ({ sayings }) => {
  return sayings.map(quote => {
    return (
      <li key={quote._id} style={{ listStyleType: "none" }} className="mb-5">
        <h2>"{quote.content}"</h2>
        <h3 style={{ color: "gray" }}>
          {quote.kid_name}, age {quote.age}
        </h3>
      </li>
    );
  });
};

export default Quote;
