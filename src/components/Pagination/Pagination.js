import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  right: <FontAwesomeIcon icon={faChevronRight} className="ml-3" />,
  left: <FontAwesomeIcon icon={faChevronLeft} className="ml-3" />,
};
function Pagination({ pages, page, changePage }) {
  return (
    pages > 1 && (
      <ul className="pagination">
        <button
          className="btn"
          onClick={() => changePage(page => parseInt(page) - 1)}
          disabled={page === 1}
        >
          {icons.left}
        </button>
        <button
          className="btn"
          onClick={() => changePage(page => parseInt(page) + 1)}
          disabled={page === pages}
        >
          {icons.right}
        </button>
      </ul>
    )
  );
}

export default Pagination;
