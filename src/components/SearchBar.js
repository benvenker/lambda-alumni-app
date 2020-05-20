import React, { useState } from "react";
import { FaAlignRight } from "react-icons/fa";
import Logo from "./Logo";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [toggled, setToggled] = useState(false);
  const { auth } = props;

  const navItems = [
    { link: "/", content: <Logo dimensions={30} /> },
    { item: "", content: <input type="text" /> },
    {
      item: "",
      content: (
        <button
          className="logout-button"
          onClick={auth.isAuthenticated() ? auth.logout : auth.login}
        >
          {auth.isAuthenticated() ? "Log out" : "Log In"}
        </button>
      ),
    },
  ];
  return (
    <div className="nav-bar">
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
