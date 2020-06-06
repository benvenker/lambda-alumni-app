import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import ButtonGoogle from "./ButtonGoogle";
import "./Posts.css";
import SearchBar from "./SearchBar";
import Loader from "react-loader-spinner";
// import posts from "../data";

const Posts = (props) => {
  const { auth, handleSearch, posts, loading, searchTerms } = props;
  const [profile, setProfile] = useState({ email: "" });
  const [error, setError] = useState("");
  const history = useHistory();

  // Get the user profile and post new users to the API
  useEffect(() => {
    const loadUserProfile = () => {
      auth.getProfile((profile, err) => {
        setProfile(auth.userProfile);
        console.log("Profile: ", auth.userProfile);
        setError(err);
      });
    };

    if (auth.isAuthenticated()) {
      loadUserProfile();
    }
    console.log("Auth profile from posts: ", profile);
  }, [profile, auth]);

  return (
    <>
      <SearchBar auth={auth} handleSearch={handleSearch} />
      <div className="btn-container lg:w-1/2 md:w-2/3 sm:w-11/12 my-2 mx-auto h-full">
        {auth.isAuthenticated() ? (
          <div
            onClick={() => history.push("/submit")}
            className="py-1 px-2 bg-blue-400 text-white w-1/4 text-center rounded-md ml-0 my-3 text-xs cursor-pointer"
          >
            Submit a New Post
          </div>
        ) : (
          // <ButtonGoogle auth={auth} />
          history.push("/")
        )}
      </div>
      {!loading ? (
        <ul className="posts-container lg:w-1/2 md:w-2/3 sm:w-11/12 my-2 mx-auto">
          {posts.map((post) => {
            console.log("post: ", post);
            return <Post profile={profile} key={post.id} post={post} />;
          })}
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
