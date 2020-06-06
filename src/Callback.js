import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

const Callback = (props) => {
  const { auth } = props;
  const history = useHistory();

  useEffect(() => {
    if (/access_token|id_token|error/.test(history.location.hash)) {
      return auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  });

  return (
    <div className="loader m-auto flex flex-col">
      <div className="loader-container m-auto text-center pt-5 border-gray-500">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={300000}
        />
      </div>
    </div>
  );
};

export default Callback;
