import React, { useEffect, useState } from "react";
import InputFields from "../InputFields/InputField";
import Quote from "../Quote/Quote";
const Search = ({ sayings }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const searchQuotes = e => {
    e.preventDefault();
    let filter = sayings.filter(x => {
      return x.content.toLowerCase().includes(search.toLowerCase());
    });
    setSearchResults(filter);
  };
  const Results = () => {
    return (
      <div>
        {searchResults.map(q => {
          return <Quote quote={q} key={q._id} />;
        })}
      </div>
    );
  };
  return (
    <div>
      <form onSubmit={searchQuotes}>        
        {searchResults && <Results />}
        <InputFields
          name="search"
          type="text"
          title="Search quotes"
          value={search}
          onChange={handleChange}
        />
        <button className="btn btn-info">search</button>
      </form>
    </div>
  );
};

export default Search;
