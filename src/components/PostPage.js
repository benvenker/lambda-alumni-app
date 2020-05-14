import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./PostPage.css";
import Post from "./Post";
import Comments from "./Comments";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});

  console.log(params);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${params.id}`)
      .then((res) => setPost(res.data[0]))
      .then((post) => console.log("post: ", post));
  }, [params.id]);

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
      <Comments />
    </div>
  );
};

export default PostPage;
