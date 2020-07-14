import React, { useState, useEffect } from 'react';
import { Route, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from './auth/Auth';

import Home from './components/Home';
import SearchBar from './components/SearchBar';
import Posts from './components/Posts';
import PostPage from './components/PostPage';
import SubmitPage from './components/SubmitPage';
import Profile from './components/Profile';
import Callback from './Callback';
import Pagination from './components/Pagination';

function App(props) {
  const history = useHistory();
  const [auth] = useState(new Auth(history));
  const [searchTerms, setSearchterms] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Load default list of posts
  useEffect(() => {
    setTimeout(() => {
      if (auth.isAuthenticated()) {
        const body = { terms: searchTerms };
        searchTerms === ''
          ? axios
              .get(`${process.env.REACT_APP_API_URL}/posts/?items=10&page=1`)
              .then(res => setPosts(res.data))
              .then(setLoading(false))
              .catch(err => err)
          : axios
              .post(`${process.env.REACT_APP_API_URL}/search`, body)
              .then(res => setPosts(res.data))
              .then(setLoading(false))
              .catch(err => console.log(err));
      }
    }, 1000);
  }, [searchTerms]);

  // Handle searching
  const handleSearch = e => {
    e.preventDefault();
    setSearchterms(e.target.value);
  };

  return (
    <div className="App font-sans bg-gray-100">
      <Route exact path="/">
        <Home auth={auth} />
      </Route>
      <Route path="/callback">
        <Callback auth={auth} />
      </Route>
      <Route path="/post/:id">
        <PostPage auth={auth} />
      </Route>
      <Route path="/posts">
        <Posts
          auth={auth}
          loading={loading}
          setLoading={setLoading}
          handleSearch={handleSearch}
          posts={posts}
          setPosts={setPosts}
          searchTerms={searchTerms}
        />
        <Pagination
          page={page}
          setPage={setPage}
          posts={posts}
          setPosts={setPosts}
        />
      </Route>
      <Route path="/submit">
        <SearchBar auth={auth} />
        <SubmitPage auth={auth} />
      </Route>
      <Route path="/profile">
        {auth.isAuthenticated() ? <Profile auth={auth} /> : <Redirect to="/" />}
      </Route>
    </div>
  );
}

export default App;
