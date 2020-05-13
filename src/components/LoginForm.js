import React from "react";
import { css } from "emotion";

const LoginForm = () => {
  return (
    <form
      className={css`
        padding: 30px;
      `}
    >
      <label
        htmlFor="username"
        className={css`
          display: block;
          text-align: left;
          padding: 5px;
        `}
      >
        Username
        <input
          className={css`
            display: block;
            margin: auto;
            width: 300px;
            height: 40px;
            border-radius: 5px;
            font-size: 16px;
            border: 1px solid lightgray;

            :focus {
              outline: none;
            }
          `}
          type="text"
          id="username"
          name="username"
        />
      </label>
      <label
        htmlFor="password"
        className={css`
          display: block;
          text-align: left;
          padding: 5px;
        `}
      >
        Password
        <input
          className={css`
            display: flex;
            flex-direction: column;
            margin: auto;
            width: 300px;
            height: 40px;
            border-radius: 5px;
            font-size: 16px;
            border: 1px solid lightgray;

            :focus {
              outline: none;
            }
          `}
          type="password"
          id="password"
          name="password"
        />
      </label>
      <button
        className={css`
          font-family: inherit;
          display: block;
          width: 300px;
          margin: 60px auto 60px auto;
          background-color: #a01a36;
          color: white;
          height: 50px;
          font-size: 18px;
          padding: 10px 0;
          text-transform: uppercase;
          border-radius: 5px;
        `}
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
