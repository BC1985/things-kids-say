import React, { useContext, useState } from "react";
import "./FullList.css";
import { Link } from "react-router-dom";
import Quote from "../Quote/Quote";
import Pagination from "../Pagination/Pagination";
import { context } from "../../Context";

function FullList() {
  const { sayings, isLoading } = useContext(context);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage, setQuotesPerPage] = useState(5);

  const Spinner = () => {
    return (
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  // determine index for pagination
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = sayings.slice(indexOfFirstQuote, indexOfLastQuote);

  // change content of page on pagination
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleChange = e => {
    setQuotesPerPage(e.target.value);
  };
  const quotesPerPageArray = [5, 10, 20];
  const MainContent = () => {
    return (
      <>
        <div className="mb-4">
          <p>Select number of quotes per page</p>
          <select onChange={handleChange} value={quotesPerPage}>
            {quotesPerPageArray.map((postsPerPage, index) => (
              <option key={index}>{postsPerPage}</option>
            ))}
          </select>
        </div>
        <Quote sayings={currentQuotes} />

        <ul className="list-group">
          <Pagination
            quotesPerPage={quotesPerPage}
            totalQuotes={sayings.length}
            paginate={paginate}
          />
        </ul>
        <div className="back-button-div">
          <Link to="/">
            <p className="mt-5 mb-5 font-weight-bold">Back to homepage</p>
          </Link>
        </div>
      </>
    );
  };
  return (
    <div className="container">
      <div className="list-wrapper">
        {isLoading ? <Spinner /> : <MainContent />}
      </div>
    </div>
  );
}

export default FullList;