import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import randomcolor from "randomcolor";

const LandingText = () => {
  const Heading = () => {
    const randomHeadingColor = {
      color: randomcolor({
        luminosity: "dark",
        hue: "random"
      })
    };
    return <h1 style={randomHeadingColor}>Things Kids Say</h1>;
  };
  const Quote = () => {
    const randomQuoteColor = {
      color: randomcolor({
        luminosity: "dark",
        hue: "random"
      }),
      fontFamily:"Lato"
    };
    return (
      <h2 style={randomQuoteColor}>
        "There are no seven wonders of the world in the eyes of children, there
        are seven million."
      </h2>
    );
  };
  const Description = () => {
    const randomDescriptionColor = {
      color: randomcolor({
        luminosity: "dark",
        hue: "random"
      })
    };
    return (
      <h3 style={randomDescriptionColor}>
        Welcome to Things Kids Say. Here you can add you child's pearls of
        wisdom to the database of adorable quotes and thoughtful truthisms.{" "}
        You can <Link to="/list">view all entries</Link>,{" "}
        <Link to="/add">add your own</Link> or{" "}
        <Link to="/random">get random quote</Link>
      </h3>
    );
  };
  return (
    <div className="container landing-wrapper">
      {<Heading />}
      <div
        className="blockquote font-italic text-secondary"
        style={{ padding: "5%" }}
      >
        {<Quote />}
        <footer className="blockquote-footer">Walt Streightiff</footer>
      </div>
      {<Description />}
    </div>
  );
};

export default LandingText;
