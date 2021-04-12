import React from "react";
import Quote from "../Quote/Quote";
const SearchResults = props => {
  console.log(props);
  return (
    <div>
      {props.location.state.map(q => {
        return <Quote quote={q} key={q._id} />;
      })}
    </div>
  );
};

export default SearchResults;
