import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./PostPage.css";
import Post from "./Post";
import Comments from "./Comments";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const [request, setRequest] = useState({
    post_id: params.id,
    body: "",
    user_id: 1,
    // created_date: new Date(),
  });

  const handleChange = (e) => {
    e.preventDefault();
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const submitComment = (e) => {
    e.preventDefault();

    setLoading(true);
    axios.post(`http://localhost:5000/post/1`, request).then((res) => {
      axios.get(`http://localhost:5000/comments/${params.id}`).then((res) => {
        setComments(res.data);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${params.id}`)
      .then((res) => setPost(res.data[0]))
      .then((post) => console.log("post: ", post));
  }, [params.id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/comments/${params.id}`)
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <div className="post-page">
      <SearchBar />
      <Post post={post} />
      <div className="content-container">
        <textarea
          onChange={handleChange}
          value={request.body}
          name="body"
          id="comment-body"
          cols="30"
          rows="10"
          placeholder="Type your comment..."
        />
        <button onClick={submitComment}>SUBMIT</button>
      </div>
      <Comments loading={loading} comments={comments} postId={params.id} />
    </div>
  );
};

export default PostPage;
