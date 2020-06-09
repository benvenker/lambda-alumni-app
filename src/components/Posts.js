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
    const loadUserProfile = async () => {
      await auth.getProfile((profile, err) => {
        console.log("auth.userProfile: ", auth.userProfile);
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

  // useEffect(() => {}, [setLoading, setPosts]);

  return (
    <>
      <SearchBar auth={auth} handleSearch={handleSearch} />
      <div className="btn-container sm:w-3/4 md:w-2/3 lg:w-1/2 my-2 mx-auto h-full">
        {auth.isAuthenticated() ? (
          <div className="submit-btn-container p-2">
            <div
              onClick={() => history.push("/submit")}
              className="py-1 px-2 bg-blue-400 text-white w-32 text-center rounded-md ml-0 my-3 text-xs cursor-pointer"
            >
              Submit a New Post
            </div>
          </div>
        ) : (
          // <ButtonGoogle auth={auth} />
          history.push("/")
        )}
      </div>
      {!loading ? (
        <ul className="posts-container w-full sm:w-11/12 sm:margin-auto md:w-2/3 lg:w-1/2 my-2 mx-auto">
          {profile
            ? posts.map((post) => (
                <Post profile={profile} key={post.id} post={post} auth={auth} />
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
