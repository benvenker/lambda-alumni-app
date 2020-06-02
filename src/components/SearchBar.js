import React from "react";
import Logo from "./Logo";
import "./SearchBar.css";

const SearchBar = (props) => {
  const { auth } = props;

  return (
    <div className="nav-bar bg-gray-700 w-full p-3 pt-5 flex text-white">
      <Logo dimensions={45} />
      <input
        className="bg-gray-800 w-3/4 h-8 border-none rounded-full pl-5 focus:outline-none"
        type="text"
        placeholder="Search all posts..."
      />
      <span>
        <button
          className="logout-button text-white bg-gray-800 text-xs border-none ml-2 px-3 py-1 rounded-md"
          onClick={auth.isAuthenticated() ? auth.logout : auth.login}
        >
          {auth.isAuthenticated() ? "Log out" : "Log In"}
        </button>
      </span>
    </div>
  );
};

export default SearchBar;
