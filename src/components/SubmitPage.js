import React, { useState } from "react";
import axios from "axios";
import "./SubmitPage.css";

const SubmitPage = () => {
  const [formState, setFormState] = useState({
    title: "",
    url: "",
    body: "",
    created_date: new Date(),
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const submitPost = () => {
    const body = formState;
    axios
      .post(`http://localhost:5000/submit`, body)
      .then((response) => console.log(response));
  };

  return (
    <div className="submit-form-container">
      <form onSubmit={submitPost}>
        <label htmlFor="title" id="title" name="title">
          <input
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            placeholder="Post title..."
          />
        </label>
        <label htmlFor="url" id="url" name="url">
          <input
            onChange={handleChange}
            type="text"
            id="url"
            name="url"
            placeholder="Post url..."
          />
        </label>
        <label htmlFor="body">
          <textarea
            onChange={handleChange}
            name="body"
            id="body"
            cols="30"
            rows="10"
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitPage;
