import React from "react";

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  return (
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
