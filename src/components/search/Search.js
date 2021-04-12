import React, { useState } from "react";
import { Redirect } from "react-router";
import InputFields from "../InputFields/InputField";
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
  return (
    <div>
      <form onSubmit={searchQuotes}>
        {searchResults.length !== 0 && (
          <Redirect
            to={{ pathname: `/search`, state: searchResults, search: search }}
          />
        )}
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
