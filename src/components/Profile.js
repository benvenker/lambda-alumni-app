import React, { useState, useEffect } from "react";

const Profile = (props) => {
  console.log(props);
  const { auth } = props;
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserProfile = () => {
      auth.getProfile((profile, error) => {
        setProfile(auth.userProfile);
        console.log("Profile: ", auth.userProfile);
        setError(error);
      });
    };

    loadUserProfile();
  }, [profile, auth, props.userProfile]);

  return (
    <>
      <h1>Profile</h1>
      {profile ? (
        <div className="profile">
          <p>{auth.userProfile.nickname}</p>
          <img src={auth.userProfile.picture} alt="profile" />
        </div>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
};

export default Profile;
