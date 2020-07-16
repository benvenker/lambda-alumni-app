import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import axios from 'axios';
import './Post.css';
import ThumbIcon from './ThumbIcon';

const Post = props => {
  const history = useHistory();
  const { post, profile, editing, setEditing } = props;
  const [currPost, setCurrPost] = useState({ ...post });

  const handleVote = post => {
    const body = {
      post_id: post.id,
      username: profile.email,
    };

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/votes/check-vote?post_id=${post.id}&username=${profile.email}`,
        body
      )
      .then(response =>
        response.data.length > 0
          ? null // If the vote exists, we don't want to do anything
          : axios
              .post(`${process.env.REACT_APP_API_URL}/votes/upvote`, body)
              .then(response =>
                response.status === 200
                  ? setCurrPost({
                      ...currPost,
                      votes: Number(currPost.votes) + 1,
                    })
                  : null
              )
      )

      .catch(err => console.log(err));
  };

  const handleDelete = () => {
    const body = { id: post.id };
    swal({
      title: 'Are you sure?',
      text: "You're about to delete a post. You can't undo this action.",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/posts/${post.id}`, body)
          .then(response => {
            console.log(response);
          })
          .then(history.push('/'))
          .catch(err => console.log(err));
      }
    });
  };

  return (
    <div
      key={post.id}
      className="post-container py-5 flex py-4 px-2 h-auto bg-white border-t border-b-0 border-r border-l"
    >
      <div className="flex flex-row w-full">
        <div className="column">
          {' '}
          <div className="mx-1 my-0 py-1 px-0" onClick={() => handleVote(post)}>
            <ThumbIcon />
          </div>
        </div>
        <div className="column w-full">
          {' '}
          <div className="flex flex-row justify-between">
            {history.location.pathname === '/posts' ? (
              <div className="hover:underline text-gray-700 px-3 text-md font-semibold my-0">
                {post.url.length > 0 ? (
                  <a
                    href={
                      /http:\/\/|https:\/\//.test(post.url)
                        ? post.url
                        : `https://${post.url}`
                    }
                  >
                    {post.title}
                  </a>
                ) : (
                  <Link to={`posts/${post.id}`}>{post.title}</Link>
                )}
              </div>
            ) : (
              <div>
                <a
                  className="text-gray-700 px-3 text-md font-semibold my-0"
                  href={
                    /http:\/\/|https:\/\//.test(post.url)
                      ? post.url
                      : `https://${post.url}`
                  }
                >
                  {post.title}
                </a>{' '}
                <span className="text-sm text-gray-600 px-3 underline">
                  {post.url ? (
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={
                        /http:\/\/|https:\/\//.test(post.url)
                          ? post.url
                          : `https://${post.url}`
                      }
                    >
                      ({post.url})
                    </a>
                  ) : null}
                </span>
              </div>
            )}
            {/* <div className="post-url text-sm text-gray-300">{post.url.slice(8)}</div> */}
            {post.user_id &&
            profile.user_id &&
            post.user_id === profile.user_id ? (
              <div className="edit-btns flex flex-row">
                <div className="column">
                  <div
                    className="btn-edit bg-white text-gray-600 underline rounded px-2 py-1 text-xs cursor-pointer"
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </div>
                </div>
                <div className="column">
                  <div
                    className="btn-delete bg-red-600 text-white rounded px-2 py-1 box-border text-xs cursor-pointer ml-3"
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-row px-3 sm:flex-row text-xs text-gray-500">
            by {post.username} |{' '}
            {history.location.pathname === '/posts'
              ? currPost.votes
              : post.votes}{' '}
            votes |{'  '}
            <Link to={`/posts/${post.id}`} className="underline ml-1">
              {'  '}
              {post.comments} comments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
