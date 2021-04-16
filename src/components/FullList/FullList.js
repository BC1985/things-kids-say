import React, { useContext } from "react";
import "./Fulllist.css";
import { Link } from "react-router-dom";
import Quote from "../Quote/Quote";
import Pagination from "../Pagination/Pagination";
import { context } from "../../Context";
import Spinner from "../Spinner/Spinner";

function FullList() {
  const { sayings, page, pages, setPage, isLoading } = useContext(context);

  const MainContent = () => {
    return (
      <>
        <div className="mb-4"></div>
        <Pagination
          page={page}
          pages={pages}
          changePage={setPage}
          totalQuotes={sayings.length}
        />
        {sayings.map((quote, index) => {
          return <Quote quote={quote} key={index} />;
        })}
        <Pagination
          page={page}
          pages={pages}
          changePage={setPage}
          totalQuotes={sayings.length}
        />
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
