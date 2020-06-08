import React from "react";
import Logo from "./Logo";
import "./SearchBar.css";

const SearchBar = (props) => {
  const { auth, handleSearch } = props;

  return (
    <div className="nav-bar bg-white w-full p-3 flex justify-start sm:justify-between text-gray-700 shadow-md">
      <Logo dimensions={30} />
      <div className=" w-11/12 sm:w-3/4">
        <input
          className="text-xs bg-gray-200 w-11/12 h-8 border-none rounded-sm outline mx-2 sm:mx-10 pl-5 focus:outline-none"
          type="text"
          placeholder="Search all posts..."
          onChange={handleSearch}
        />
      </div>
      <span>
        <div className="">
          <div
            className="logout-button text-white bg-gray-400 hover:bg-gray-500 text-xs border-none px-1 rounded-md focus:outline-none"
            onClick={auth.isAuthenticated() ? auth.logout : auth.login}
          >
            {auth.isAuthenticated() ? "Log out" : "Log In"}
          </div>
        </div>
      </span>
    </div>
  );
};

export default SearchBar;
