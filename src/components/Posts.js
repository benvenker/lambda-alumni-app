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
    axios.get(`http://localhost:5000/posts`).then((res) => setPosts(res.data));
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

    // const body = { username: auth.userProfile.email };

    // if (profile) {
    //   if (profile.username.length > 1) {
    //     console.log(
    //       axios
    //         .post(`http://localhost:5000/add-user`, body)
    //         .then((respone) => console.log(respone))
    //     );
    //   }
    // }

    console.log("Auth profile from posts: ", profile);
  }, [profile, auth]);

  return (
    <>
      <SearchBar auth={auth} />
      {auth.isAuthenticated() ? (
        <button
          onClick={() => history.push("/submit")}
          className="button new-post"
        >
          Submit
        </button>
      ) : (
        <ButtonGoogle auth={auth} />
      )}
      <ul className="posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default Posts;
