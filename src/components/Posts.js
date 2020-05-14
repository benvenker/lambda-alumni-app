import React from "react";
import Post from "./Post";
import "./Posts.css";
import SearchBar from "./SearchBar";
// import posts from "../data";

const Posts = () => {
  const posts = [
    {
      title: "Some great post title goes here",
      url: "https://google.com",
      user: "JaneDoe",
      votes: 44,
      comments: 7,
    },
    {
      title: "Some great post title goes here",
      url: "https://google.com",
      user: "JaneDoe",
      votes: 44,
      comments: 7,
    },
    {
      title: "Some great post title goes here",
      url: "https://google.com",
      user: "JaneDoe",
      votes: 44,
      comments: 7,
    },
    {
      title: "Some great post title goes here",
      url: "https://google.com",
      user: "JaneDoe",
      votes: 44,
      comments: 7,
    },
    {
      title: "Some great post title goes here",
      url: "https://google.com",
      user: "JaneDoe",
      votes: 44,
      comments: 7,
    },
  ];
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
