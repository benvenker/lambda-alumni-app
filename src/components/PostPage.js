import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import './PostPage.css';
import Post from './Post';
import Comments from './Comments';
import PostForm from './PostForm';

const PostPage = props => {
  const history = useHistory();
  const { auth } = props;
  const params = useParams();
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);

  const [request, setRequest] = useState({
    post_id: params.id,
    body: '',
    user_id: 0,
    // created_date: new Date(),
  });

  const handleChange = e => {
    e.preventDefault();
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const submitComment = e => {
    e.preventDefault();

    setLoading(true);
    // TODO: figure out what do with this: the below API call calls a POST to /posts but is inserting a comment
    axios
      .post(`${process.env.REACT_APP_API_URL}/comments`, request)
      .then(res => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/comments/${params.id}`, {
            headers: {
              Authorization: `Bearer ${props.auth.getAccessToken()}`,
            },
          })
          .then(res => {
            setComments(res.data);
            setLoading(false);
            setRequest({ ...request, body: '' });
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
          const getUserIdFromDb = () => {
            return axios
              .get(
                `${process.env.REACT_APP_API_URL}/users/username?username=${profile.email}`
                // {
                //   headers: {
                //     "Content-Type": "application/json",
                //     Authorization: `Bearer ${auth.getAccessToken()}`,
                //   },
                // }
              )
              .then(response => {
                console.log(response);
                setProfile({ ...profile, user_id: response.data.id });
                setRequest({ ...request, user_id: response.data.id });
              });
          };

          getUserIdFromDb();
        });
    };

    loadUserProfile();
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${params.id}`)
      .then(res => setPost(res.data[0]))
      .then(post => console.log('post: ', post));
  }, [params.id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/comments/${params.id}`, {
        headers: {
          Authorization: `Bearer ${props.auth.getAccessToken()}`,
        },
      })
      .then(response => {
        setComments(response.data);
        setLoading(false);
      });
  }, [params.id, props.auth]);

  return !editing ? (
    <div className="post-page" auth={auth}>
      {auth.isAuthenticated() ? (
        <div className="post-page h-screen">
          <SearchBar auth={props.auth} />
          <Post
            post={post}
            profile={profile}
            editing={editing}
            setEditing={setEditing}
          />
          <div className="content-container p-4 sm:w-11/12 md:w-4/5 lg:w-2/4 my-1 mx-auto bg-white rounded-md">
            <div className="post-body lg:ml-24">
              {post.body && post.body.length > 0 ? (
                <div className="mt-10 text-gray-700">{post.body}</div>
              ) : null}
            </div>
            {/* <div className="comment-form-header w-3/4 lg:ml-16 mt-10 text-2xl text-gray-600">
              Submit a Comment
            </div> */}
            <textarea
              className="rounded-md border border-gray-300 block w-full sm:my-1 md:my-6 lg:ml-16 relative w-11/12 sm:w-11/12 lg:w-2/3 p-1 focus:outline-none text-sm"
              onChange={handleChange}
              value={request.body}
              name="body"
              id="comment-body"
              cols="30"
              rows="5"
              placeholder="Type your comment..."
            />
            <button
              className="submit-comment-button block mt-5 lg:ml-24 bg-blue-500 text-white text-xs py-1 px-2 rounded-md focus:outline-none"
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
        history.push('/')
      )}
    </div>
  ) : (
    <PostForm
      auth={auth}
      post={post}
      setPost={setPost}
      profile={profile}
      editing={editing}
      setEditing={setEditing}
    />
  );
};

export default PostPage;
