import React from "react";
import { Link } from "react-router-dom";
// import "./LoginForm.css";
import { css } from "emotion";

const styles = {
  button: css({
    fontFamily: "inherit",
    display: "block",
    width: "300px",
    margin: "60px auto 60px auto",
    backgroundColor: "#a01a36",
    color: "white",
    height: "50px",
    fontSize: "18px",
    padding: "10px 0",
    texTransform: "uppercase",
    borderRadius: "5px",
  }),
};

const LoginForm = () => {
  return (
    <form className="p-6">
      <label htmlFor="username" className="block text-center p-1">
        Username
        <input
          className="block m-auto h-10 w-1/3 rounded-m text-sm border-gray-300"
          type="text"
          id="username"
          name="username"
        />
      </label>
      <label htmlFor="password" className="block text-center p-1">
        Password
        <input
          className="block m-auto h-10 w-1/3 rounded-m text-sm border-gray-300"
          type="password"
          id="password"
          name="password"
        />
      </label>
      <Link to="/posts">
        {/* TODO: Center button */}
        <div className="flex flex-col items center justify-center">
          <button
            className="w-1/3 bg-red-800 my-8 mx-auto text-white h-12 py-2 px-0 uppercase rounded-md"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </Link>
    </form>
  );
};

export default LoginForm;
