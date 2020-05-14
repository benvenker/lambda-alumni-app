import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comments.css";
import Comment from "./Comment";

const Comments = (props) => {
  const { postId } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/${postId}`)
      .then((response) => setComments(response.data));
  });

  return (
    <div className="comment">
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
