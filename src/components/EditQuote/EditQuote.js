import React, { useEffect, useState, useContext } from "react";
import { apiService } from "../../Services/apiServices";
import InputField from "../InputFields/InputField";
import DeleteQuote from "../Delete button/DeleteButton";
import Spinner from "../Spinner/Spinner";
import { context } from "../../Context";

function EditQuote(props) {
  const [quote, setQuote] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(context);
  const [isUpdated, setIsUpdated] = useState(false);

  const quoteId = props.match.params.id;
  useEffect(() => {
    const getQuoteById = async () => {
      const quoteData = await apiService.getQuoteById(quoteId);
      setQuote(quoteData);
      setIsLoading(false);
    };
    getQuoteById();
  }, [quoteId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setQuote({
      ...quote,
      [name]: value,
    });
  };

  const validateInput = () => {
    const validAge = new RegExp(/^[0-9]{1,2}$/);
    const validContent = new RegExp(/^(?=.*[A-Z0-9])[\w.,!"'/$ ]+$/i);
    const validName = new RegExp(/^[a-zA-Z][a-zA-Z\\s]+$/);
    if (!quote.content.match(validContent)) {
      return "Please enter valid characters for content, no special symbols.";
    }
    if (!String(quote.age).match(validAge)) {
      return "Please enter valid age";
    }
    if (!quote.kid_name.match(validName)) {
      return "Please enter valid characters for name.";
    }
    return;
  };
  // sending is enabled only if all fields are populated
  const isEnabled = quote.content && quote.age && quote.kid_name;
  const onSubmit = async e => {
    e.preventDefault();
    const invalidInput = validateInput();
    if (invalidInput) {
      setMessage(invalidInput);
    } else {
      const data = await apiService.updateQuote(quoteId, quote);
      if (data !== undefined) {
        setMessage(data.message);
        setIsUpdated(true);
        setTimeout(() => {
          props.history.push(`/my_quotes/user/${user._id}`);
        }, 1000);
      } else {
        setMessage(data);
      }
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit} className="p-4">
          <div className="d-flex flex-column">
            <InputField
              required
              title="Child's name"
              value={quote.kid_name}
              name="kid_name"
              onChange={handleChange}
            />
            <InputField
              required
              type="number"
              pattern="\d*"
              maxLength="2"
              min="1"
              title="Age"
              value={quote.age}
              name="age"
              onChange={handleChange}
            />
            <InputField
              required
              title="They said what?"
              value={quote.content}
              name="content"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={!isEnabled}
            className="btn btn-outline-primary font-weight-bold col-sm-2 mt-3"
          >
            Submit
          </button>
          <DeleteQuote id={quoteId} />
        </form>
      )}
      <p className="pl-4">
        {message}
        {isUpdated && <Spinner />}
      </p>
    </div>
  );
}

export default EditQuote;
