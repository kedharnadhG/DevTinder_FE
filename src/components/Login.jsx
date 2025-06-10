import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

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
      return navigate("/");
      // setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      const newUser = res.data?.data?.savedUser;

      dispatch(addUser(newUser));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user) {
      if (isLoginForm) navigate("/");
      else navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <div className="mb-2">
              {!isLoginForm && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      value={firstName}
                      className="input"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      value={lastName}
                      className="input"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  value={emailId}
                  className="input"
                  onChange={(e) => setEmailId(e.target.value, setError(""))}
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
                disabled={
                  isLoginForm
                    ? !emailId || !password
                    : !firstName || !lastName || !emailId || !password
                }
                onClick={isLoginForm ? handleLogin : handleSignup}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>

            <p
              className="text-center hover:cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm
                ? "New User? Sign Up Here"
                : "Existing User? Login Here"}{" "}
            </p>
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
