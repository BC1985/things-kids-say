import React, { useState, useRef } from "react";
import { apiService } from "../../Services/apiServices";
import { Link } from "react-router-dom";
import "./AddQuote.css";
import InputField from "../InputFields/InputField";
import TextArea from "../InputFields/TextArea";

function AddQuote() {
  const [input, setInput] = useState({});
  const [quotesSubmitted, setQuotesSubmitted] = useState(0);
  const [error, setError] = useState("");

  const {kid_name, age, content} = input
  // validation logic for input
  const validateInput = () => {
    const validContent = new RegExp(/^(?=.*[A-Z0-9])[\w.,!"'/$ ]+$/i);
    if (!content.match(validContent)) {
      return "Please enter valid characters for content, no special symbols.";
    }
    const validName = new RegExp(/^[a-zA-Z][a-zA-Z\\s]+$/);
    if (!input.kid_name.match(validName)) {
      return "Please enter valid characters for name.";
    }
    const validAge = new RegExp(/^[0-9]{1,2}$/);
    if (!input.age.match(validAge)) {
      return "Please enter valid age";
    }
  };

  // enable submit button only when all fields are filled out
  const isEnabled = kid_name && age && content;

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const inputNotValid = validateInput();
      if (inputNotValid) {
        setError(inputNotValid);
      } else {
        const quote = {
          kid_name: kid_name,
          age: age,
          content: content,
        };
        const res = await apiService.addNewEntry(quote);
        if (res !== undefined) {
          setError("");
          setInput(input => ({ ...input === "" }));
          setQuotesSubmitted(quotesSubmitted + 1);          
        } else {
          setError(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInput(input => ({ ...input, [name]: value }));
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
    return <p className="text-danger">{error}</p>;
  };

  return (
    <div className="container mb-5 mt-5">
      <h2 className="text-center childish-font mb-5">
        Your kid said something adorable or hilarious? Add it to the collection
      </h2>
      <form className="form-group" onSubmit={onSubmit}>
        <div className="row no-gutters d-flex">
          <div className="d-flex flex-column mr-4">
            <InputField
              required
              name="kid_name"
              title={"Name"}
              onChange={handleChange}
              value={kid_name}
            />
            <InputField
              required
              name="age"
              pattern="\d*"
              maxLength="2"
              min="1"
              type="number"
              title={"Age"}
              value={age}
              onChange={handleChange}
            />
            <TextArea
              required
              title={"content"}
              name="content"
              value={content}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      {error && <Error />}
      <button
        type={error ? "disabled" : "submit"}
        className="btn btn-outline-primary mt-5 font-weight-bold"
        disabled={!isEnabled}
        onClick={onSubmit}
      >
        Submit
      </button>
      {quotesSubmitted > 0 && <ThankYou />}
      <Link to="/">
        <p className=" mt-5 font-weight-bold">Back to homepage</p>
      </Link>
    </div>
  );
}

export default AddQuote;
