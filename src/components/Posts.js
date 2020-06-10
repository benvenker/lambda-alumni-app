import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Post from "./Post";
import "./Posts.css";
import SearchBar from "./SearchBar";
import Loader from "react-loader-spinner";
import axios from "axios";
// import posts from "../data";

const Posts = (props) => {
  const { auth, handleSearch, posts, setPosts, loading, setLoading } = props;
  const [profile, setProfile] = useState({ email: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  // Get the user profile and post new users to the API
  useEffect(() => {
    const loadUserProfile = () => {
      auth.getProfile((profile, err) => {
        setProfile(auth.userProfile);
        setError(err);
      });
    };

    if (auth.isAuthenticated()) {
      loadUserProfile();
      axios
        .get(`${process.env.REACT_APP_API_URL}/posts`)
        .then((res) => setPosts(res.data))
        .then(setLoading(false))
        .catch((err) => err);
    }
  }, [profile, auth, setLoading, setPosts]);

  // Refresh the page when the route loads to load new data...
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/posts`)
        .then((res) => setPosts(res.data))
        .then(setLoading(false))
        .then(setLoading(false))
        .catch((err) => err);
    }, 800);
  }, []);

  // Get the with the most votes first
  const sortByMostVotes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/popular`)
      .then((response) => setPosts(response.data));
  };

  // Get the most recent posts
  const sortByMostRecent = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then((response) => setPosts(response.data));
  };

  return (
    <>
      <SearchBar auth={auth} handleSearch={handleSearch} />
      <div className="btn-container flex lg:w-1/2 md:w-2/3 sm:w-11/12 my-2 mx-auto h-full">
        {auth.isAuthenticated() ? (
          <>
            <div className="submit-btn-container p-2">
              <div
                onClick={() => history.push("/submit")}
                className="py-1 px-2 bg-blue-400 text-white w-32 text-center rounded-md ml-0 my-1 text-xs cursor-pointer"
              >
                Submit a New Post
              </div>
            </div>
            <div className="popular-btn p-2">
              <div
                onClick={sortByMostVotes}
                className="py-1 px-2 bg-orange-400 text-white w-30 text-center rounded-md mx-0 my-1 text-xs cursor-pointer"
              >
                Popular
              </div>
            </div>
            <div className="recent-btn p-2">
              <div
                onClick={sortByMostRecent}
                className="py-1 px-2 bg-green-500 text-white w-30 text-center rounded-md mx-0 my-1 text-xs cursor-pointer"
              >
                Recent
              </div>
            </div>
          </>
        ) : (
          // <ButtonGoogle auth={auth} />
          history.push("/")
        )}
      </div>
      {!loading ? (
        <ul className="posts-container lg:w-1/2 md:w-2/3 sm:w-11/12 my-2 mx-auto">
          {profile
            ? posts.map((post) => (
                <Post profile={profile} key={post.id} post={post} />
              ))
            : null}
        </ul>
      ) : (
        <div className="loader m-auto flex flex-col">
          <div className="loader-container m-auto text-center pt-5 border-gray-500">
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={300000}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
