import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import "./Posts.css";
import SearchBar from "./SearchBar";
// import posts from "../data";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts`).then((res) => setPosts(res.data));
  }, []);

  console.log(posts);
  // const { post } = props;

  return (
    <>
      <SearchBar />
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default Posts;
