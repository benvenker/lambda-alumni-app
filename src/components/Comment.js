import React from "react";
import "./Comment.css";

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comment font-bold text-xs my-8" key={comment.id}>
      <div className="comment-info">
        {comment.username} on {comment.created_date}
      </div>
      <div className="comment-body p-8">
        <p>{comment.body}</p>
      </div>
      {/* <button>REPLY</button> */}
    </div>
  );
};

export default Comment;
