import React, { useState } from "react";
import { apiService } from "../../Services/apiServices";
import { Link } from "react-router-dom";
import "./AddQuote.css";

function AddQuote(props) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");
  const [hasError, setHasError] = useState(false);
  const [quotesSubmitted, setQuotesSubmitted] = useState(0);
  const [error, setError] = useState("");
  // validation logic for input
  const validateInput = () => {
    const validContent = new RegExp(/^(?=.*[A-Z0-9])[\w.,!"'/$ ]+$/i);
    if (!content.match(validContent)) {
      return "Please enter valid characters for content, no special symbols.";
    }
    const validName = new RegExp(/^[a-zA-Z][a-zA-Z\\s]+$/);
    if (!name.match(validName)) {
      return "Please enter valid characters for name.";
    }
    const validAge = new RegExp(/^[0-9]*$/);
    if (!age.match(validAge)) {
      return "Age must be numbers only";
    }
  };

  // enable submit button only when all fields are filled out
  const isEnabled = name && age && content;
  // error message outputs

  const errorMessage = validateInput();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const inputNotValid = validateInput();
      if (inputNotValid) {
        setHasError(true);
      } else {
        const quote = {
          kid_name: name,
          age: age,
          content: content,
        };
        const res = await apiService.addNewEntry(quote);

        console.log(res);
        if (!res.ok) {
          setError(res);
        } else {
          setHasError(false);
          setName("");
          setAge("");
          setContent("");
          setQuotesSubmitted(quotesSubmitted + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ThankYou = () => {
    return (
      <div className="thank-you-wrapper">
        <h3 className="childish-font">
          Your quote has been added. You have submitted {quotesSubmitted}{" "}
          {quotesSubmitted === 1 ? "quote" : "quotes"}. You may add another
          quote or <Link to="/">click here to return to the homepage</Link>
        </h3>
      </div>
    );
  };

  const Error = () => {
    return <h2>{error}</h2>;
  };

  return (
    <div className="container mb-5 mt-5">
      <h2 className="text-center childish-font mb-5">
        Your kid said something adorable or hilarious? Add it to the collection
      </h2>
      <form className="form-group">
        <div className="row no-gutters d-flex">
          <div className="d-flex flex-column mr-4">
            <label className="childish-font">Child's name</label>
            <input
              type="text"
              value={name}
              className="form-control shadow-sm mb-3"
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="childish-font">Age</label>
            <input
              type="text"
              pattern="\d*"
              maxLength="2"
              min="1"
              value={age}
              className="form-control shadow-sm mb-3 col-3"
              onChange={e => setAge(e.target.value)}
              required
            />
          </div>
        </div>
        <p className="font-weight-bold text-danger">
          {hasError && errorMessage}
        </p>
        <label className="childish-font">They said what?</label>
        <textarea
          type="text"
          value={content}
          className="form-control shadow-sm mb-3"
          onChange={e => setContent(e.target.value)}
          required
        />
      </form>
      <button
        type={hasError ? "disabled" : "button"}
        className="btn btn-outline-primary mt-5 font-weight-bold"
        disabled={!isEnabled}
        onClick={onSubmit}
      >
        Submit
      </button>
      {error && <Error />}
      {quotesSubmitted > 0 && <ThankYou />}
      <Link to="/">
        <p className=" mt-5 font-weight-bold">Back to homepage</p>
      </Link>
    </div>
  );
}

export default AddQuote;
