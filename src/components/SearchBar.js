import React, { useState } from "react";
import Logo from "./Logo";
import "./SearchBar.css";

const SearchBar = (props) => {
  const { auth, handleSearch } = props;
  const [navToggled, setNavToggled] = useState(false);

  return (
    <nav className="flex items-center lg:items-stretch justify-between flex-wrap bg-white py-6 px-3">
      <div className="flex items-center flex-shrink-0 text-gray-700 mr-6">
        <Logo dimensions={30} />
        <div>
          <input
            className="w-full text-xs bg-gray-200 h-8 border-none rounded-sm outline mx-2 sm:mx-10 pl-5 focus:outline-none"
            type="text"
            placeholder="Search all posts..."
            onChange={handleSearch}
          />
        </div>
        {/* <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span> */}
      </div>
      <div className="block lg:hidden">
        <button
          className="focus:outline-none flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-gray-400 hover:border-gray-400"
          onClick={() => setNavToggled(!navToggled)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          navToggled ? "block" : "hidden"
        } w-full block flex-grow lg:flex-grow-0 lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-500 mr-4"
          >
            <div
              className="logout-button text-gray-500 text-sm"
              onClick={auth.isAuthenticated() ? auth.logout : auth.login}
            >
              {auth.isAuthenticated() ? "Log out" : "Log In"}
            </div>
          </a>
          {/* <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Examples
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Blog
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
