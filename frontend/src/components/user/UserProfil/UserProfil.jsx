import React from "react";

const UserProfil = ({ user }) => {
  const { pseudo, email, createdAt } = user;
  const date = new Date(Date.parse(createdAt));

  console.log(date);

  return (
    <div className="userProfil">
      <div className="userProfil_pseudo">
        <strong>Pseudo :</strong> {pseudo}
      </div>
      <div className="userProfil_email">
        <strong>Email :</strong> {email}
      </div>
      <div className="userProfil_date">
        <strong>Compte créer le :</strong> {date.getDay()} / {date.getMonth()} /{" "}
        {date.getFullYear()}
      </div>
    </div>
  );
};

export default UserProfil;
