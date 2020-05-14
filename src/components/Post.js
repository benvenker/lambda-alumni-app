import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import ThumbIcon from "./ThumbIcon";
import { css } from "emotion";

const Post = (props) => {
  const { post } = props;
  console.log({ post });

  return (
    <div key={post.id} className="post-container">
      <div className="column">
        {" "}
        <div className="vote">
          <ThumbIcon />
        </div>
      </div>
      <div className="column">
        {" "}
        <div className="row">
          <div className="post-title">{post.title}</div>
          {/* <div className="post-url">{post.url.slice(8)}</div> */}
        </div>
        <div className="row">
          by {post.user} | {post.votes} votes | {post.comments} comments
        </div>
      </div>
    </div>
  );
};

export default Post;
