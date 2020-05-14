import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostPage from "./components/PostPage";
import SubmitPage from "./components/SubmitPage";
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
        <PostPage className={styles.app} />
      </Route>
      <Route path="/posts">
        <Posts className={styles.app} />
      </Route>
      <Route path="/submit">
        <SearchBar />
        <SubmitPage className={styles.app} />
      </Route>
    </div>
  );
}

export default App;
