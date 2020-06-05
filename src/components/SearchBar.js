import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = (props) => {
  const { auth, handleSearch } = props;

  return (
    <div className="nav-bar bg-white w-full p-3 pt-5 flex items-start justify-between text-gray-700 shadow-md">
      <Logo dimensions={30} />
      <div className="w-3/4 pt-1">
        <input
          className="text-xs bg-gray-100 w-11/12 h-8 border-none rounded-sm outline mx-10 pl-5 focus:outline-none"
          type="text"
          placeholder="Search all posts..."
          onChange={handleSearch}
        />
      </div>
      <span>
        <div className="pt-1">
          <button
            className="logout-button text-white bg-gray-400 text-xs border-none ml-2 px-3 py-1 rounded-md"
            onClick={auth.isAuthenticated() ? auth.logout : auth.login}
          >
            {auth.isAuthenticated() ? "Log out" : "Log In"}
          </button>
        </div>
      </span>
    </div>
  );
};

export default SearchBar;
