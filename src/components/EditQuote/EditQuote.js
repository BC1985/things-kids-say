import React, { useEffect, useState } from "react";
import { apiService } from "../../Services/apiServices";

function EditQuote(props) {
  const [quote, setQuote] = useState({});
  const [message, setMessage] = useState("Loading...");
  const [successMessage, setSuccessMessage] = useState("");


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
            <label className="col-form-label">Child's name</label>
            <input
              value={quote.kid_name}
              name="kid_name"
              className="form-control"
              onChange={handleChange}
            />
            <label className="col-form-label">Age</label>
            <input
              value={quote.age}
              name="age"
              className="form-control"
              onChange={handleChange}
            />
            <label className="col-form-label">They said what?</label>
            <input
              value={quote.content}
              name="content"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
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
