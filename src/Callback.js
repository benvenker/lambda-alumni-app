import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

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

  return <h1>Loading...</h1>;
};

export default Callback;
