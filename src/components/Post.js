import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import ThumbIcon from "./ThumbIcon";

const Post = (props) => {
  const { post } = props;

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
          <Link to={`/post/${post.id}`}>
            <div className="post-title">{post.title}</div>
          </Link>
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
