import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // console.log(feed);
  const getFeed = async () => {
    // if (feed) return;
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

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="text-2xl font-bold text-center my-10 ">
        No New Users Found!!
      </h1>
    );

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
