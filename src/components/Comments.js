import React from "react";
import "./Comments.css";
import Comment from "./Comment";

const comments = [
  {
    user: "benvenker",
    date: "2020-05-13",
    body:
      "This was a really interesting post, I'm so glad you  made it. One thing I wa thinking about  was how unoriginal it is. I think I've seen almost the exact same post like 35 times today.",
  },
  {
    user: "benvenker",
    date: "2020-05-13",
    body:
      "This was a really interesting post, I'm so glad you  made it. One thing I wa thinking about  was how unoriginal it is. I think I've seen almost the exact same post like 35 times today.",
  },
  {
    user: "benvenker",
    date: "2020-05-13",
    body:
      "This was a really interesting post, I'm so glad you  made it. One thing I wa thinking about  was how unoriginal it is. I think I've seen almost the exact same post like 35 times today.",
  },
  {
    user: "benvenker",
    date: "2020-05-13",
    body:
      "This was a really interesting post, I'm so glad you  made it. One thing I wa thinking about  was how unoriginal it is. I think I've seen almost the exact same post like 35 times today.",
  },
];

const Comments = (props) => {
  const { comment } = props;
  return (
    <div className="comment">
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
