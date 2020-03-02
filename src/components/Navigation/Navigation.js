import React, { useState } from "react";
import { Link } from "react-router-dom";
import RandomQuote from "../RandomQuote/RandomQuote";
const Navigation = () => {
  let [randomQuote, setRandomQuote] = useState(0);

  const getRandomQuote = () => {
    setRandomQuote(randomQuote + 1);
  };
  return (
    <div className=" container text-center">
      <div className="d-flex justify-content-around mt-5">
        <Link to="/list" className="text-white text-decoration-none">
          <button className=" btn btn-info">All quotes</button>
        </Link>
        <Link to="/add" className="text-white text-decoration-none">
          <button className="btn btn-info">Add quote</button>
        </Link>
        <button className="btn btn-info" onClick={getRandomQuote}>
          Get random quote
        </button>
      </div>
      {randomQuote > 0 && (
        <div className="random-quote">
          <RandomQuote />
        </div>
      )}
    </div>
  );
};

export default Navigation;
