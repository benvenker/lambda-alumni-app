import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./PostPage.css";
import Post from "./Post";
import Comments from "./Comments";

const PostPage = (props) => {
  const history = useHistory();
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
    axios.post(`${process.env.REACT_APP_API_URL}/post`, request).then((res) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/comments/${params.id}`, {
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
      if (auth.isAuthenticated())
        auth.getProfile((profile, err) => {
          setProfile(auth.userProfile);
          const body = { username: profile.email };
          console.log({ body });

          const getUserIdFromDb = () => {
            return axios
              .post(
                `${process.env.REACT_APP_API_URL}/users`,
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
      .get(`${process.env.REACT_APP_API_URL}/post/${params.id}`)
      .then((res) => setPost(res.data[0]))
      .then((post) => console.log("post: ", post));
  }, [params.id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${params.id}`, {
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
    <div className="post-page" auth={auth}>
      {auth.isAuthenticated() ? (
        <div className="post-page h-screen">
          <SearchBar auth={props.auth} />
          <Post post={post} profile={profile} />
          <div className="content-container py-0 px-4 w-11/12 my-1 mx-auto">
            <div className="post-body ml-24">
              {post.body && post.body.length > 0 ? (
                <div className="mt-10 text-gray-700">{post.body}</div>
              ) : null}
            </div>
            <textarea
              className="rounded-md border-gray-300 block my-6 ml-24 relative w-2/3 p-1 focus:outline-none text-sm"
              onChange={handleChange}
              value={request.body}
              name="body"
              id="comment-body"
              cols="30"
              rows="10"
              placeholder="Type your comment..."
            />
            <button
              className="submit-comment-button block ml-24 bg-blue-500 text-white text-xs py-1 px-2 rounded-md "
              onClick={submitComment}
            >
              SUBMIT
            </button>
            <Comments
              loading={loading}
              comments={comments}
              postId={params.id}
            />
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default PostPage;
