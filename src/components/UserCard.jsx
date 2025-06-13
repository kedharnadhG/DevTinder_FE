import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_SERVER_BACKEND_BASEURL
        }/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      // console.log(res);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="card bg-base-300 w-96  shadow-xl">
        <figure>
          <img src={photoUrl} alt="photo" className="w-90 h-96" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p>
              {age} | {gender} | {skills.join(", ")}
            </p>
          )}
          <p>{about} </p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
      <div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCard;
