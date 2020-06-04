import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import PostForm from "./PostForm";

import "./SubmitPage.css";

const SubmitPage = (props) => {
  const history = useHistory();
  const { auth } = props;
  const [profile, setProfile] = useState({});

  console.log("auth: ", auth);

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
    // console.log({ profile });
  }, []);

  return <PostForm auth={auth} profile={profile} />;
};

export default SubmitPage;
