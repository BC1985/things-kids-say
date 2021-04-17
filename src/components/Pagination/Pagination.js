import React from "react";
import { Link } from "react-router-dom";
function Pagination({ quotesPerPage, totalQuotes, paginate}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalQuotes / quotesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <Link
              to={`/quotes/${number}`}
              onClick={() => paginate(number)}
              className="page-link"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
