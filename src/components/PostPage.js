import React from "react";
import SearchBar from "./SearchBar";
import "./PostPage.css";
import Post from "./Post";
import { useParams } from "react-router-dom";

const post = {
  id: 2,
  user: "bavenker",
  title: "This is an individual post",
  votes: 33,
  commments: 98,
};
const PostPage = () => {
  const params = useParams();

  return (
    <div className="post-page">
      <SearchBar />
      <Post post={post} />
      <div className="content-container">
        <textarea
          name="comment-body"
          id="comment-body"
          cols="30"
          rows="10"
          placeholder="Type your comment..."
        />
        <button>SUBMIT</button>
      </div>
    </div>
  );
};

export default PostPage;
