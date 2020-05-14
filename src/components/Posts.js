import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import "./Posts.css";
import SearchBar from "./SearchBar";
// import posts from "../data";

const Posts = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts`).then((res) => setPosts(res.data));
  }, []);

  console.log(posts);
  // const { post } = props;

  return (
    <>
      <SearchBar />
      <button
        onClick={() => history.push("/submit")}
        className="button new-post"
      >
        Submit
      </button>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default Posts;
