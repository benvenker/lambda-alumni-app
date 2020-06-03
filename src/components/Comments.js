import React from "react";
import Loader from "react-loader-spinner";
import "./Comments.css";
import Comment from "./Comment";

const Comments = (props) => {
  const { comments, loading } = props;

  return (
    <div className="comment m-auto flex flex-col">
      {loading ? (
        <div className="loader-container m-auto text-center pt-5 border-gray-500">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={300000}
          />
        </div>
      ) : comments.length === 0 ? (
        <div className="no-comments m-auto">No comments yet, submit one!</div>
      ) : (
        comments.map((comment) => {
          return (
            <div className="comments-container m-auto">
              <Comment comment={comment} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Comments;
