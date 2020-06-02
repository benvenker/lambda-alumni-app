import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import ButtonGoogle from "./ButtonGoogle";
import "./Posts.css";
import SearchBar from "./SearchBar";
// import posts from "../data";

const Posts = (props) => {
  const { auth } = props;
  const [profile, setProfile] = useState({ email: "" });
  const [error, setError] = useState("");

  const history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => setPosts(res.data));
    // .then((res) => console.log("posts: ", res));
  }, []);

  // Get the user profile and post new users to the API
  useEffect(() => {
    const loadUserProfile = () => {
      auth.getProfile((profile, err) => {
        setProfile(auth.userProfile);
        console.log("Profile: ", auth.userProfile);
        setError(err);
      });
    };

    loadUserProfile();
    console.log("Auth profile from posts: ", profile);
  }, [profile, auth]);

  return (
    <>
      <SearchBar auth={auth} />
      {auth.isAuthenticated() ? (
        <button
          onClick={() => history.push("/submit")}
          className="py-1 px-2 bg-blue-400 text-white rounded-md ml-6 my-3 text-xs"
        >
          Submit
        </button>
      ) : (
        <ButtonGoogle auth={auth} />
      )}
      <ul className="posts-container w-2/3 my-2 mx-auto">
        {posts.map((post) => {
          console.log("post: ", post);
          return <Post profile={profile} key={post.id} post={post} />;
        })}
      </ul>
    </>
  );
};

export default Posts;
