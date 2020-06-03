import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./SubmitPage.css";

const SubmitPage = (props) => {
  const history = useHistory();
  const { auth } = props;
  const [profile, setProfile] = useState({});

  console.log("auth: ", auth);

  const [formState, setFormState] = useState({
    title: "",
    url: "",
    body: "",
    created_date: new Date(),
    username: "",
  });

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
              setFormState({ ...formState, user_id: response.data.id });
            });
        };

        getUserIdFromDb();
      });
    };

    loadUserProfile();
    // console.log({ profile });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const submitPost = (e) => {
    e.preventDefault();
    const body = formState;
    axios
      .post(`${process.env.REACT_APP_API_URL}/submit`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      })
      .then(history.push("/posts"))
      .then((response) => console.log(response));
  };

  return (
    <div className="submit-form-container">
      <form className="w-2/3 mx-auto my-8 p-8" onSubmit={(e) => submitPost(e)}>
        <label htmlFor="title" id="title" name="title">
          <input
            className="focus:outline-none block p-2 border m-4 h-8 w-11/12 box-border rounded-md"
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            placeholder="Post title..."
          />
        </label>
        <label htmlFor="url" id="url" name="url">
          <input
            className="focus:outline-none sblock p-2 border m-4 h-8 w-11/12 box-border rounded-md"
            onChange={handleChange}
            type="text"
            id="url"
            name="url"
            placeholder="Post url..."
          />
        </label>
        <label htmlFor="body">
          <textarea
            placeholder="Enter optional post text..."
            onChange={handleChange}
            name="body"
            id="body"
            cols="30"
            rows="10"
            className="resize-none focus:outline-none p-4 border text-gray-700 m-5 rounded-md w-11/12"
          ></textarea>
        </label>
        <button
          className="ml-5 bg-blue-500 text-white rounded-md py-1 px-3 text-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitPage;
