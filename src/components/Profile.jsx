import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   } else {
  //     navigate("/profile");
  //   }
  // }, [user]);

  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
