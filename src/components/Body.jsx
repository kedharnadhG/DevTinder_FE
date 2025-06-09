import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/profile/view`,
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
    } catch (error) {
      if(error.status === 401) navigate("/login");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (userData && window.location.pathname === "/login") {
  //     navigate("/");
  //   }
  // }, [userData, navigate]);

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
