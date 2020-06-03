import React from "react";
import "./Comment.css";

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comments text-xs my-4" key={comment.id}>
      <div className="comment-info text-gray-600 text-xs">
        {comment.username} on {comment.created_date}
      </div>
      <div className="comment-body px-0 py-4 text-gray-800 text-base">
        <p>{comment.body}</p>
      </div>
      {/* <button>REPLY</button> */}
    </div>
  );
};

export default Comment;
