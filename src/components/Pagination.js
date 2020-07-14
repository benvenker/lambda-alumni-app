import React from 'react';
import axios from 'axios';

const NoNewPosts = () => {
  return <h2>No more posts!</h2>;
};

const Pagination = props => {
  const { page, setPage, posts, setPosts } = props;

  const nextPage = page => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/?items=10&page=${page + 1}`)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  };

  const previousPage = page => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/?items=10&page=${page - 1}`)
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  };
  return (
    <div className="pagination mx-auto flex items-center justify-center">
      {page > 1 ? (
        <button
          className="bg-white rounded p-2 border m-auto w-32 focus:outline-none"
          onClick={() => {
            setPage(page - 1);
            previousPage(page);
          }}
        >
          Previous
        </button>
      ) : null}
      {!posts.length < 10 ? (
        <button
          className="bg-white rounded p-2 border m-auto w-32 focus:outline-none"
          onClick={() => {
            setPage(page + 1);
            nextPage(page);
          }}
        >
          Next
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
