import React from "react";
import logo from "./logo.svg";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
