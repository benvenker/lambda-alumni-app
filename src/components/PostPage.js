import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./PostPage.css";
import Post from "./Post";
import Comments from "./Comments";

const PostPage = (props) => {
  const { auth } = props;
  const params = useParams();
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const [request, setRequest] = useState({
    post_id: params.id,
    body: "",
    user_id: 0,
    // created_date: new Date(),
  });

  const handleChange = (e) => {
    e.preventDefault();
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const submitComment = (e) => {
    e.preventDefault();

    setLoading(true);
    axios.post(`http://localhost:5000/post`, request).then((res) => {
      axios
        .get(`http://localhost:5000/comments/${params.id}`, {
          headers: {
            Authorization: `Bearer ${props.auth.getAccessToken()}`,
          },
        })
        .then((res) => {
          setComments(res.data);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    // get the user profile
    const loadUserProfile = () => {
      auth.getProfile((profile, err) => {
        setProfile(auth.userProfile);
        const body = { username: profile.email };
        console.log({ body });

        const getUserIdFromDb = () => {
          return axios
            .post(
              `http://localhost:5000/users`,
              body
              // {
              //   headers: {
              //     "Content-Type": "application/json",
              //     Authorization: `Bearer ${auth.getAccessToken()}`,
              //   },
              // }
            )
            .then((response) => {
              console.log(response);
              setProfile({ ...profile, user_id: response.data.id });
              setRequest({ ...request, user_id: response.data.id });
            });
        };

        getUserIdFromDb();
      });
    };

    loadUserProfile();
    // console.log({ profile });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${params.id}`)
      .then((res) => setPost(res.data[0]))
      .then((post) => console.log("post: ", post));
  }, [params.id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/comments/${params.id}`, {
        headers: {
          Authorization: `Bearer ${props.auth.getAccessToken()}`,
        },
      })
      .then((response) => {
        setComments(response.data);
        setLoading(false);
      });
  }, [params.id, props.auth]);

  return (
    <div className="post-page">
      <SearchBar auth={props.auth} />
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
        <button className="submit-comment-button" onClick={submitComment}>
          SUBMIT
        </button>
        <Comments loading={loading} comments={comments} postId={params.id} />
      </div>
    </div>
  );
};

export default PostPage;
