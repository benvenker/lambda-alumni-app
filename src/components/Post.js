import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import ThumbIcon from "./ThumbIcon";

const Post = (props) => {
  const history = useHistory();
  const { post, profile } = props;

  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState(0);

  console.log("location: ", history.location.pathname);

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
    <div
      key={post.id}
      className="post-container flex flex-column py-4 px-2 h-auto rounded bg-white m-1 shadow-xs"
    >
      <div className="column">
        {" "}
        <div className="mx-1 my-0 py-1 px-0" onClick={() => handleVote(post)}>
          <ThumbIcon />
        </div>
      </div>
      <div className="column">
        {" "}
        <div className="flex flex-row">
          {history.location.pathname === "/posts" ? (
            <Link className={"no-underline"} to={`/post/${post.id}`}>
              <div className="text-blue-500 px-3 text-sm my-0">
                {post.title}
              </div>
            </Link>
          ) : (
            <div>
              <a className="text-blue-500" href={post.url}>
                {post.title}
              </a>{" "}
              <span className="text-sm text-gray-500 underline">
                <a href={post.url}>({post.url})</a>
              </span>
            </div>
          )}
          {/* <div className="post-url text-sm text-gray-300">{post.url.slice(8)}</div> */}
        </div>
        <div className="flex flex-row text-xs px-3 text-gray-400">
          by {post.username} | {votes} votes | {comments} comments
        </div>
      </div>
    </div>
  );
};

export default Post;
