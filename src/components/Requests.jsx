import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/user/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || "Something went wrong");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <h1 className="text-2xl text-center font-bold">No Pending Requests</h1>
    );

  if (requests.length === 0)
    return (
      <h1 className="text-2xl font-bold text-center">No Pending Requests</h1>
    );

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-3xl  font-bold">Connection Requests</h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="m-4 p-4 justify-between mx-auto rounded-lg w-1/2 bg-base-300 flex items-center"
            >
              <div>
                <img
                  src={photoUrl}
                  alt="photo"
                  className="rounded-full w-[100px] h-[100px]"
                />
              </div>
              <div className="text-left mx-4">
                <h1 className="text-2xl font-bold">
                  {firstName} {lastName}
                </h1>
                {age && gender && (
                  <p>
                    {age} | {gender}
                  </p>
                )}
                <p className="text-left text-wrap">{about}</p>
              </div>
              <div className="flex gap-4 ">
                <button className="btn btn-primary">Reject</button>
                <button className="btn btn-secondary">Accept</button>
              </div>
            </div>
          );
        })}
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

export default Requests;
