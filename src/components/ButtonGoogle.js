import React from "react";
import { css } from "emotion";

const ButtonGoogle = (props) => {
  const { auth } = props;
  return (
    <>
      <button
        onClick={auth.login}
        className={css`
          font-family: inherit;
          display: block;
          margin: 60px auto 60px auto;
          background-color: #278ae4;
          color: white;
          width: 300px;
          height: 50px;
          font-size: 18px;
          padding: 10px 0;
          text-transform: uppercase;
          border-radius: 5px;
        `}
      >
        Sign in with Google
      </button>
    </>
  );
};

export default ButtonGoogle;
