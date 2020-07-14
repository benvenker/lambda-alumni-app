import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import Post from "./Post";
import "./Posts.css";
import SearchBar from "./SearchBar";
import AddButton from "./AddButton";
import Loader from "react-loader-spinner";
import axios from "axios";

const Posts = (props) => {
  const {
    auth,
    handleSearch,
    posts,
    page,
    items,
    setPage,
    setItems,
    setPosts,
    hasMore,
    setHasMore,
    loading,
    setLoading,
  } = props;

  const [profile, setProfile] = useState({ email: "" });
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");
  const history = useHistory();

  // Get the user profile and post new users to the API
  useEffect(() => {
    setPage(1);
    const loadUserProfile = () => {
      auth.getProfile((profile, err) => {
        setProfile(auth.userProfile);
        setError(err);
      });
    };

    if (auth.isAuthenticated()) {
      loadUserProfile();
      // axios
      //   .post(`${process.env.REACT_APP_API_URL}/posts`, {
      //     page: page,
      //     items: 20,
      //   })
      //   .then((res) => setPosts(res.data))
      //   .then(setLoading(false))
      //   .catch((err) => err);
    }
  }, [profile, auth, setLoading]);

  // Refresh the page when the route loads to load new data...
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     axios
  //       .post(`${process.env.REACT_APP_API_URL}/posts`, {
  //         page: page,
  //         items: 20,
  //       })
  //       .then((res) => setPosts(res.data))
  //       .then(setLoading(false))
  //       .catch((err) => err);
  //   }, 800);
  // }, []);

  // Get the with the most votes first
  const sortByMostVotes = () => {
    setPage(1);
    console.log("page: ", page);
    setSort("popular");
    axios
      .post(`${process.env.REACT_APP_API_URL}/popular`, {
        items: items,
        page: 1,
      })
      .then((response) => setPosts(response.data))
      .catch((err) => err);
  };

  // Get the most recent posts
  const sortByMostRecent = () => {
    setPage(1);
    console.log("Page: ", page);
    setSort("recent");
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts`, {
        items: items,
        page: 1,
      })
      .then((response) => setPosts(response.data))
      .catch((err) => err);
  };

  const getMorePosts = async () => {
    console.log("getting more posts");
    console.log(posts);
    await setPage((page) => page + 1); // do we just want to set the page to 2?
    console.log("page from getMorePosts: ", page);
    if (sort === "recent" || sort === "") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/posts`, {
          page: page,
          items: items,
        })
        .then((res) => {
          const newPosts = res.data;
          const postsCopy = [...posts, ...newPosts];
          if (newPosts.length < items) return setHasMore(false);

          setPosts([
            ...posts,
            ...postsCopy.reduce((acc, element) => {
              if (!acc.find((el) => el["id"] === element["id"])) {
                acc.push(element);
              }
              return acc;
            }, []),
          ]);
        })
        .catch((err) => err);
    }
    if (sort === "popular") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/popular`, {
          page: page,
          items: items,
        })
        .then((res) => {
          const newPosts = res.data;
          const postsCopy = [...posts, ...newPosts];
          if (newPosts.length < items) return setHasMore(false);

          setPosts([
            ...posts,
            ...postsCopy.reduce((acc, element) => {
              if (!acc.find((el) => el["id"] === element["id"])) {
                acc.push(element);
              }
              return acc;
            }, []),
          ]);
        })
        .catch((err) => err);
    }
  };

  return (
    <>
      <AddButton />
      <SearchBar auth={auth} handleSearch={handleSearch} />
      <div className="btn-container flex lg:w-1/2 md:w-2/3 sm:w-11/12 my-2 mx-auto h-full">
        {auth.isAuthenticated() ? (
          <>
            <div className="submit-btn-container p-2">
              <div
                onClick={() => history.push("/submit")}
                className="py-1 px-2 bg-blue-400 text-white w-32 text-center rounded-md ml-0 my-1 text-xs cursor-pointer"
              >
                Submit a New Post
              </div>
            </div>
            <div className="popular-btn p-2">
              <div
                onClick={() => sortByMostVotes()}
                className="py-1 px-2 bg-orange-400 text-white w-30 text-center rounded-md mx-0 my-1 text-xs cursor-pointer"
              >
                Popular
              </div>
            </div>
            <div className="recent-btn p-2">
              <div
                onClick={() => sortByMostRecent()}
                className="py-1 px-2 bg-green-500 text-white w-30 text-center rounded-md mx-0 my-1 text-xs cursor-pointer"
              >
                Recent
              </div>
            </div>
          </>
        ) : (
          // <ButtonGoogle auth={auth} />
          history.push("/")
        )}
      </div>
      {!loading ? (
        <ul
          id="scrollableDiv"
          className="posts-container lg:w-1/2 md:w-2/3 sm:w-11/12 my-2 mx-auto"
        >
          {profile ? (
            <InfiniteScroll
              dataLength={posts.length}
              next={getMorePosts}
              hasMore={hasMore}
              loader={
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
              }
              // scrollableTarget="scrollableDiv"
            >
              {posts.map((post, i) => (
                <Post profile={profile} key={i} post={post} />
              ))}
            </InfiniteScroll>
          ) : null}
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
