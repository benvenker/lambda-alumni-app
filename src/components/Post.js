import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import ThumbIcon from "./ThumbIcon";

const Post = (props) => {
  const history = useHistory();
  const { post, profile, editing, setEditing } = props;

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
      .post(`${process.env.REACT_APP_API_URL}/check-vote`, body)
      .then((response) =>
        response.data.length > 0
          ? null // If the vote exists, we don't want to do anything
          : axios
              .post(`${process.env.REACT_APP_API_URL}/upvote`, body)
              .then((response) =>
                response.status === 200 ? setVotes((votes) => votes++) : null
              )
      )

      .catch((err) => console.log(err));
  };

  return (
    <div
      key={post.id}
      className="post-container py-5 flex justify-between py-4 px-2 h-auto rounded bg-white m-1 shadow-md"
    >
      <div className="flex flex-row">
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
                <div className="hover:underline text-gray-700 px-3 text-md font-semibold my-0">
                  {post.title}
                </div>
              </Link>
            ) : (
              <div>
                <a className="text-gray-700 font-semibold" href={post.url}>
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
      {post.user_id && profile.user_id && post.user_id === profile.user_id ? (
        <div className="column">
          <div
            className="btn-edit bg-red-600 text-white rounded px-2 py-1 text-xs cursor-pointer"
            onClick={() => setEditing(true)}
          >
            Edit
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Post;
