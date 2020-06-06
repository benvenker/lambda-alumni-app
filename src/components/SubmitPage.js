import React, { useState, useEffect } from "react";
import axios from "axios";

import PostForm from "./PostForm";

import "./SubmitPage.css";

const SubmitPage = (props) => {
  const { auth } = props;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // get the user profile
    const loadUserProfile = () => {
      auth.getProfile((profile, err) => {
        setProfile(auth.userProfile);
        const body = { username: profile.email };

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
            });
        };

        getUserIdFromDb();
      });
    };

    loadUserProfile();
  }, []);

  return <PostForm auth={auth} profile={profile} />;
};

export default SubmitPage;
