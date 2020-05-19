import React from "react";
import "./Comment.css";

const Comment = (props) => {
  const { comment } = props;
  return (
    <>
      <div className="comment-info">
        {comment.user_id} {comment.created_date}
      </div>
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
      {/* <button>REPLY</button> */}
    </>
  );
};

export default Comment;
