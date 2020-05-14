import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Post from "./components/Post";
import { css } from "emotion";
import "./App.css";

const styles = css({
  app: {
    fontFamily: "Fira Code",
  },
});

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home className={styles.app} />
      </Route>
      <Route path="/post/:id">
        <Post className={styles.app} />
      </Route>
      <Route path="/posts">
        <Posts className={styles.app} />
      </Route>
    </div>
  );
}

export default App;
