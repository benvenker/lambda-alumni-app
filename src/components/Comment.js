import React from "react";
import "./Comment.css";

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comment" key={comment.id}>
      <div className="comment-info">
        {comment.username} at {comment.user_id} {comment.created_date}
      </div>
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
      {/* <button>REPLY</button> */}
    </div>
  );
};

export default Comment;
