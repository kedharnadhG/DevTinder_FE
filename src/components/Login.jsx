import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //TODO: modify the State
  const [emailId, setEmailId] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("Akshay@098");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data.data.user);
      dispatch(addUser(res.data?.data?.user));
      navigate("/");
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
      <div className="flex justify-center mt-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div className="mb-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  value={emailId}
                  className="input"
                  onChange={(e) => (setEmailId(e.target.value, setError("")))}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="password"
                  value={password}
                  className="input"
                  onChange={(e) => (setPassword(e.target.value), setError(""))}
                />
              </fieldset>
            </div>
            <p className="text-error mx-auto">{error}</p>
            <div className="card-actions justify-center py-4">
              <button
                className="btn btn-primary"
                disabled={!emailId || !password}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
