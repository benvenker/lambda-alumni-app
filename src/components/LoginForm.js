import React from "react";
import { Link } from "react-router-dom";
// import "./LoginForm.css";
import { css } from "emotion";

const styles = {
  label: css({
    display: "block",
    textAlign: "left",
    padding: "5px",
  }),

  userInput: css({
    display: `block`,
    margin: `auto`,
    width: `300px`,
    height: `40px`,
    borderRadius: `5px`,
    fontSsize: `16px`,
    border: `1px solid lightgray`,
    ":focus": {
      outline: `none`,
    },
  }),

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
    <form
      className={css`
        padding: 30px;
      `}
    >
      <label htmlFor="username" className={styles.label}>
        Username
        <input
          className={styles.userInput}
          type="text"
          id="username"
          name="username"
        />
      </label>
      <label htmlFor="password" className={styles.label}>
        Password
        <input
          className={styles.userInput}
          type="password"
          id="password"
          name="password"
        />
      </label>
      <Link to="/posts">
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </Link>
    </form>
  );
};

export default LoginForm;
