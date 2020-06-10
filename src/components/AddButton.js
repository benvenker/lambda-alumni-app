import React from "react";
import { useHistory } from "react-router-dom";

import "./AddButton.css";

const AddButton = () => {
  const history = useHistory();

  return (
    <div
      onClick={() => history.push("/submit")}
      className="add-button-background bg-red-400 p-2"
    >
      <div className="add-button w-8 h-8"></div>
    </div>
  );
};

export default AddButton;
