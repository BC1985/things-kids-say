import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { context } from "../../Context";
import randomcolor from "randomcolor";

function RandomQuote() {
  let [randomQuote, setRandomQuote] = useState(0);

  const quoteStyle = {
    color: randomcolor({
      luminosity: "bright",
      hue: "random"
    }),
    fontFamily: "Mouse Memoirs",
    margin: "20% auto"
  };
  const getRandomQuote = () => {
    setRandomQuote(randomQuote + 1);
  };
  const { sayings } = useContext(context);

  const quotes = [];

  const getContent = () => {
    for (let index = 0; index < sayings.length; index++) {
      quotes.push(sayings[index].content);
    }
  };
  getContent();

  const generateRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="container text-center">
      <h2 style={quoteStyle} className="container">
        "{generateRandomQuote()}"
      </h2>
      <button
        type="button"
        className="btn btn-success"
        onClick={getRandomQuote}
      >
        Get random quote
      </button>
      <Link to="/">
        <p className=" mt-5 font-weight-bold">Back to homepage</p>
      </Link>
    </div>
  );
}

export default RandomQuote;
