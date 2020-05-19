import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./Comments.css";
import Comment from "./Comment";

const Comments = (props) => {
  const { comments, loading } = props;

  return (
    <div className="comment">
      {loading ? (
        <div className="loader-container">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={30000}
            margin="auto"
          />
        </div>
      ) : comments.length === 0 ? (
        <div className="no-comments">No comments yet, submit one!</div>
      ) : (
        comments.map((comment) => {
          return (
            <div className="comments-container">
              <Comment comment={comment} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Comments;
