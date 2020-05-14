import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Comments.css";
import Comment from "./Comment";

const Comments = (props) => {
  const { postId } = props;
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/comments/${postId}`).then((response) => {
      setComments(response.data);
      setLoading(false);
      console.log({ comments });
    });
  }, []);

  return (
    <div className="comment">
      {loading ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
          margin="auto"
        />
      ) : (
        comments.map((comment) => {
          return <Comment comment={comment} />;
        })
      )}
    </div>
  );
};

export default Comments;
