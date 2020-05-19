import React from "react";
import Logo from "./Logo";
import "./SearchBar.css";

const SearchBar = (props) => {
  console.log("searchbar props:", props);
  const { auth } = props;
  return (
    <div className="search-bar">
      <Logo dimensions={45} />

      <input type="text" placeholder="Search all posts..." />
      <span>
        <button
          className="logout-button"
          onClick={auth.isAuthenticated() ? auth.logout : auth.login}
        >
          {auth.isAuthenticated() ? "Log out" : "Log In"}
        </button>
      </span>
    </div>
  );
};

export default SearchBar;
