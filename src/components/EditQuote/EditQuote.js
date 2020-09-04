import React, { useEffect, useState } from "react";

function EditQuote(props) {
  const [quote, setQuote] = useState({});
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [successMessage,setSuccessMessage] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  console.log(quote);
  const quoteId = props.match.params.id;
  const getQuote = async () => {
    const res = await fetch(`http://localhost:5000/sayings/${quoteId}`);
    try {
      if (res.ok) {
        const data = await res.json();
        setQuote(data);
        setMessage("");
      } else {
        let error = await res.json();
        setIsError(true);
        setMessage(error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = e => {
    setQuote({
      ...quote,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const url = `http://localhost:5000/sayings/update/${quoteId}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(quote),
    });

    const data = await res.json();
    setSuccessMessage("Your quote has been successfully edited.")
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
          <button type="submit" className="btn btn-outline-primary font-weight-bold col-sm-2 mt-3">Submit</button>
        </form>
      )}
      {successMessage}
    </>
  );
}

export default EditQuote;
