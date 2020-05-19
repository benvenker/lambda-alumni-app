import React, { useState } from "react";
import { FaAlignRight } from "react-icons/fa";
import Logo from "./Logo";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [toggled, setToggled] = useState(false);
  const { auth } = props;

  return (
    <div className="nav-bar">
      <button className="hamburger-menu" onClick={() => setToggled(!toggled)}>
        <FaAlignRight />
      </button>

      <ul className={toggled ? "nav-links show-nav" : "nav-links"}>
        <li href="#">
          {" "}
          <Logo dimensions={30} />
        </li>
        <li href="#">
          <input type="text" placeholder="Search all posts..." />
        </li>
        <li href="#">
          {" "}
          <button
            className="logout-button"
            onClick={auth.isAuthenticated() ? auth.logout : auth.login}
          >
            {auth.isAuthenticated() ? "Log out" : "Log In"}
          </button>
        </li>
      </ul>

      {/* <Logo dimensions={45} />

      <input type="text" placeholder="Search all posts..." />
      <span>
        <button
          className="logout-button"
          onClick={auth.isAuthenticated() ? auth.logout : auth.login}
        >
          {auth.isAuthenticated() ? "Log out" : "Log In"}
        </button>
      </span> */}
    </div>
  );
};

export default SearchBar;
