import React, { useEffect, useState } from "react";
import { apiService } from "../../Services/apiServices";
import InputField from "../InputFields/InputField";

function EditQuote(props) {
  const [quote, setQuote] = useState({});
  const [message, setMessage] = useState("Loading...");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);


  const quoteId = props.match.params.id;
  useEffect(() => {
    const getQuoteById = async () => {
      const quoteData = await apiService.getQuoteById(quoteId);
      setQuote(quoteData);
      setMessage("");
    };
    getQuoteById();
  }, [quoteId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setQuote({
      ...quote,
      [name]: value,
    });
    String(value).trim() === "" ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const data = await apiService.updateQuote(quoteId, quote);
    setSuccessMessage(data.message);
  };

  return (
    <>
      <div className="container">
        <h1>{message}</h1>
      </div>
      {!message && (
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
            disabled={isDisabled}
            className="btn btn-outline-primary font-weight-bold col-sm-2 mt-3"
          >
            Submit
          </button>
        </form>
      )}
      {successMessage}
    </>
  );
}

export default EditQuote;
