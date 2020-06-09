import React, { useState } from "react";
import axios from "axios";

const PostForm = (props) => {
  const { auth, profile, editing, setEditing, post, setPost } = props;
  const [formState, setFormState] = useState({
    title: "",
    url: "",
    body: "",
    created_date: new Date(),
    username: "",
    user_id: profile.user_id,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handlePostUpdate = (e) => {
    e.preventDefault();
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submitPost = (e) => {
    e.preventDefault();
    const body = {
      ...formState,
      user_id: profile.user_id,
      username: profile.email,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/submit`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      })
      .then((response) => console.log(response));
  };

  const updatePost = (e) => {
    e.preventDefault();
    const body = {
      ...post,
      user_id: profile.user_id,
      username: profile.email,
    };
    axios
      .put(`${process.env.REACT_APP_API_URL}/post/${post.id}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      })
      .then(setEditing(false))
      .then((response) => console.log(response));
  };

  return (
    <div className="submit-form-container">
      <form
        className="bg-gray-100 rounded-md border mx-auto my-8 p-8 sm:w-11/12 md:w-2/3 lg:w-2/3"
        onSubmit={(e) => submitPost(e)}
      >
        {editing ? (
          <h1 className="text-2xl ml-5 text-bold text-gray-700">Edit Post</h1>
        ) : (
          <h1 className="text-2xl ml-5 text-bold text-gray-700">
            Submit New Post
          </h1>
        )}
        <label htmlFor="title" id="title" name="title">
          <input
            className="form-input py-4 px-3 focus:outline-none w-11/12"
            onChange={editing ? handlePostUpdate : handleChange}
            type="text"
            id="title"
            name="title"
            value={editing ? post.title : formState.title}
            placeholder="Post title..."
          />
        </label>
        <label htmlFor="url" id="url" name="url">
          <input
            className="form-input py-4 px-3 focus:outline-none w-11/12"
            onChange={editing ? handlePostUpdate : handleChange}
            type="text"
            id="url"
            name="url"
            value={editing ? post.url : formState.url}
            placeholder="Post url..."
          />
        </label>
        <label htmlFor="body">
          <textarea
            placeholder="Enter optional post text..."
            onChange={editing ? handlePostUpdate : handleChange}
            name="body"
            value={editing ? post.body : formState.body}
            id="body"
            cols="30"
            rows="10"
            className="resize-none focus:outline-none py-4 px-3 bg border text-gray-700 m-5 rounded-md w-11/12"
          ></textarea>
        </label>
        <button
          className="ml-5 bg-blue-500 text-white rounded-md py-1 px-3 text-sm"
          type="submit"
          onClick={editing ? updatePost : submitPost}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
