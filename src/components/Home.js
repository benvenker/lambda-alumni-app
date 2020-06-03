import React from "react";
import Logo from "./Logo";
import { useHistory } from "react-router-dom";
import ButtonGoogle from "./ButtonGoogle";

const Home = (props) => {
  const { auth } = props;
  const history = useHistory();

  return (
    <div auth={auth} className="flex flex-col justify-center items-center">
      {!auth.isAuthenticated() ? (
        <div className="text-center flex flex-col justify-center items-center w-2/4 m-auto mt-48 bg-white rounded-md">
          <h1 className="text-5xl w-64 mx-auto my-3">Lambda Alumni Network</h1>
          <div>
            <Logo dimensions={180} />
          </div>
          <ButtonGoogle auth={auth} />
          {/* <LoginForm /> */}
        </div>
      ) : (
        history.push("/posts")
      )}
    </div>
  );
};

export default Home;
