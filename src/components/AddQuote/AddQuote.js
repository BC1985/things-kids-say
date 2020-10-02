import React, { useState, useContext } from "react";
import { apiService } from "../../Services/apiServices";
import { Link } from "react-router-dom";
import "./AddQuote.css";
import InputField from "../InputFields/InputField";
import TextArea from "../InputFields/TextArea";
import { context } from "../../Context";

function AddQuote() {
  const [input, setInput] = useState({});
  const [quotesSubmitted, setQuotesSubmitted] = useState(0);
  const [error, setError] = useState("");
  const { user } = useContext(context);

  const { kid_name, age, content } = input;
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
          setInput(input => ({ ...(input === "") }));
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
          quote(s). You may add another quote or{" "}
          <Link to={`/settings/user/${user._id}`}>
            click here to return to your quotes.
          </Link>
        </h3>
      </div>
    );
  };

  const Error = () => {
    return <p className="text-danger">{error}</p>;
  };

  return (
    <div className="container mb-5 mt-5">
      <h2 className="childish-font mb-5">
        Your kid said something adorable or hilarious? Add it to the collection
      </h2>
      <div className="d-flex flex-column">
        <div className="">
          <form className="form-group align-self-center" onSubmit={onSubmit}>
            <div className="row no-gutters">
              <div className="col-8">
                <InputField
                  required
                  name="kid_name"
                  title={"Name"}
                  onChange={handleChange}
                  value={kid_name}
                />
              </div>
              <div className="col-3 offset-1">
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
              </div>
            </div>
            <TextArea
              required
              title={"content"}
              name="content"
              value={content}
              onChange={handleChange}
            />
            <button
              type={error ? "disabled" : "submit"}
              className="btn btn-outline-primary mt-5 font-weight-bold"
              disabled={!isEnabled}
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {error && <Error />}
      {quotesSubmitted > 0 && <ThankYou />}
      <Link to="/">
        <p className=" mt-5 font-weight-bold">Back to homepage</p>
      </Link>
    </div>
  );
}

export default AddQuote;
