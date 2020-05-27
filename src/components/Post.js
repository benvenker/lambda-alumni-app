import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import ThumbIcon from "./ThumbIcon";

const Post = (props) => {
  const { post, profile } = props;

  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/votes`, { post_id: post.id })
      .then((response) => setVotes(response.data[0].count))
      .catch((err) => console.log(err));
  }, [votes, post.id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${post.id}/count`)
      .then((reponse) => setComments(reponse.data[0].count))
      .catch((err) => console.log(err));
  }, [post.id]);

  const handleVote = (post) => {
    console.log("clicked");
    const body = {
      post_id: post.id,
      username: profile.email,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/upvote`, body)
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
          by {post.username} | {votes} votes | {comments} comments
        </div>
      </div>
    </div>
  );
};

export default Post;
