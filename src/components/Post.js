import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import ThumbIcon from "./ThumbIcon";

const Post = (props) => {
  const { post, profile } = props;

  const [votes, setVotes] = useState(0);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/votes`, { post_id: post.id })
      .then((response) => setVotes(response.data[0].count))
      .catch((err) => console.log(err));
  });

  const handleVote = (post) => {
    console.log("clicked");
    const body = {
      post_id: post.id,
      username: profile.email,
    };
    axios
      .post(`http://localhost:5000/upvote`, body)
      .then((response) =>
        response.status === 200 ? setVotes((votes) => votes++) : null
      )
      .catch((err) => console.log(err));
  };

  return (
    <div key={post.id} className="post-container">
      <div className="column">
        {" "}
        <div className="vote" onClick={() => handleVote(post)}>
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
          by {post.user} | {votes} votes | {post.comments} comments
        </div>
      </div>
    </div>
  );
};

export default Post;
