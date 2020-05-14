import React from "react";
import Logo from "./Logo";
import "./SearchBar.css";
const SearchBar = () => {
  return (
    <div className="search-bar">
      <Logo dimensions={45} />

      <input type="text" placeholder="Search all posts..." />
    </div>
  );
};

export default SearchBar;
