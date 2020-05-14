import React from "react";
import Logo from "./Logo";
import { css } from "emotion";
import ButtonGoogle from "./ButtonGoogle";
import LoginForm from "./LoginForm";

const Home = (props) => {
  return (
    <div
      className={css`
        text-align: center;
      `}
    >
      <h1
        className={css`
          width: 314px;
          margin: 72px auto 30px auto;
          font-size: 36px;
          font-weight: normal;
        `}
      >
        Lambda Alumni Network
      </h1>
      <Logo dimensions={180} />
      <ButtonGoogle />
      <LoginForm />
    </div>
  );
};

export default Home;
