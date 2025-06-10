import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about );
  const [skills, setskills] = useState(user?.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const allSkills = [
    "Frontend",
    "Backend",
    "MERN",
    "Java",
    "Docker",
    "SQL",
    "DSA",
    "DBMS",
    "System Design",
  ];

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/profile/edit`,
        { firstName, lastName, age, gender, about, photoUrl, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const toggleSkill = (skill) => {
    setskills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <>
      <div className="flex justify-center md:flex-row items-center gap-4 flex-col min-h-screen  my-3">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="mb-2">
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
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo Url</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age}
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <div className="flex justify-between">
                  <fieldset className="fieldset mr-2">
                    <legend className="fieldset-legend">Gender</legend>

                    <div className="dropdown w-full">
                      <label tabIndex={0} className="btn m-1">
                        {gender ? gender : "Select Gender"}
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-md z-[1]"
                      >
                        <li>
                          <button onClick={() => setGender("Male")}>
                            Male
                          </button>
                        </li>
                        <li>
                          <button onClick={() => setGender("Female")}>
                            Female
                          </button>
                        </li>
                        <li>
                          <button onClick={() => setGender("Others")}>
                            Others
                          </button>
                        </li>
                      </ul>
                    </div>
                  </fieldset>

                  <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend">Skills</legend>

                    <div className="dropdown w-full">
                      <label
                        tabIndex={0}
                        className="btn w-full justify-between"
                      >
                        {skills.length > 0
                          ? skills.join(", ")
                          : "Choose your skills"}
                        <svg
                          className="ml-2 h-4 w-4 opacity-60"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </label>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64 z-[1] max-h-64 overflow-y-auto"
                      >
                        {allSkills.map((skill) => (
                          <li key={skill}>
                            <label className="cursor-pointer flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={skills.includes(skill)}
                                onChange={() => toggleSkill(skill)}
                              />
                              <span>{skill}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </fieldset>
                </div>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    value={about}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    placeholder="Tell us something about yourself..."
                    onChange={(e) => {
                      setAbout(e.target.value);
                      setError("");
                    }}
                  ></textarea>
                </fieldset>
              </div>
              <p className="text-error mx-auto">{error}</p>
              <div className="card-actions justify-center py-1">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
