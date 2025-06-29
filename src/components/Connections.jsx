import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/user/connections`,
        { withCredentials: true }
      );
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="text-2xl font-bold text-center my-10 ">
        No connections Found
      </h1>
    );

  return (
    <div className="text-center my-10 overflow-y-auto min-h-screen p-4">
      <h1 className="text-3xl font-bold">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="m-4 p-4 mx-auto justify-between rounded-lg max-w-xl bg-base-300 flex flex-col sm:flex-row items-center gap-4"
          >
            <img
              src={photoUrl}
              alt="photo"
              className="rounded-full w-[100px] h-[100px] object-cover"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold">
                {firstName} {lastName}
              </h1>
              {age && gender && (
                <p className="text-sm text-gray-500">
                  {age} | {gender}
                </p>
              )}
              <p className="text-wrap">{about}</p>
            </div>
            <Link to={`/chat/${_id}`}>
              {" "}
              <button className="btn btn-secondary ">Chat</button>{" "}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
