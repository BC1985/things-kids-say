import React, { useContext, useState, useEffect } from "react";
import { context } from "../../Context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner/Spinner";
import { apiService } from "../../Services/apiServices";
function MyQuotes(props) {
  const { sayings } = useContext(context);
  const [quotesByUser, setQuotesByUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    const fetchData = async () => {
      let id = props.match.params.id;
      const userQuotes = await apiService.getQuotesByUser(id);
      setQuotesByUser(userQuotes);
    };
    fetchData();
  }, [sayings, props.match.params.id]);

  const editIcon = (
    <FontAwesomeIcon
      icon={faPencilAlt}
      className="text-danger edit-icon ml-3"
    />
  );

  const renderContent = () => {
    // if there are quotes
    if (quotesByUser.length > 0) {
      return <QuotesList />;
    }
    // if no quotes
    else {
      if (isLoading) {
        return <Spinner />;
      } else {
        return "You have no quotes.";
      }
    }
  };
  const QuotesList = () => {
    return (
      <div>
        <h1 className="mb-4">My quotes</h1>
        {quotesByUser.map(quote => {
          return (
            <li
              key={quote._id}
              style={{ listStyleType: "none" }}
              className="mb-3"
            >
              <div className="item d-flex">
                <p className="item">"{quote.content}"</p>
                <Link to={`/edit/${quote._id}`}>{editIcon}</Link>
              </div>
            </li>
          );
        })}
      </div>
    );
  };
  return <div className="container mt-3">{renderContent()}</div>;
}

export default MyQuotes;
