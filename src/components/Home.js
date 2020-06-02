import React from "react";
import Logo from "./Logo";
import { css } from "emotion";
import ButtonGoogle from "./ButtonGoogle";
import LoginForm from "./LoginForm";

const Home = (props) => {
  const { auth } = props;
  return (
    <div className="text-center flex-col justify-center">
      <h1 className="text-5xl w-64 mx-auto my-3">Lambda Alumni Network</h1>
      <Logo dimensions={180} />
      <ButtonGoogle auth={auth} />
      <LoginForm />
    </div>
  );
};

export default Home;
