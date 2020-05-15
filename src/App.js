import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Auth from "./auth/Auth";

import Home from "./components/Home";
import SearchBar from "./components/SearchBar";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostPage from "./components/PostPage";
import SubmitPage from "./components/SubmitPage";
import Callback from "./Callback";
import { css } from "emotion";
import "./App.css";

const styles = css({
  app: {
    fontFamily: "Fira Code",
  },
});

function App(props) {
  const history = useHistory();
  const [auth, setAuth] = useState(new Auth(history));

  return (
    <div className="App">
      <Route exact path="/">
        <Home auth={auth} className={styles.app} />
      </Route>
      <Route path="/callback">
        <Callback auth={auth} className={styles.app} />
      </Route>
      <Route path="/post/:id">
        <PostPage className={styles.app} />
      </Route>
      <Route path="/posts">
        <Posts auth={auth} className={styles.app} />
      </Route>
      <Route path="/submit">
        <SearchBar />
        <SubmitPage className={styles.app} />
      </Route>
    </div>
  );
}

export default App;
