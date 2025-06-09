import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  // console.log("feed", feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/feed`,
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
