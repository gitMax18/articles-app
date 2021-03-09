import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserPassword } from "../../../redux/actions.js/userAction";

const UpdateUserPassword = () => {
  const [dataPassword, setDataPassword] = useState({
    password: "",
    newPassword: "",
  });

  const dispatch = useDispatch();

  const { isUpdated } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setDataPassword({
      ...dataPassword,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(dataPassword));
  };

  return (
    <form onSubmit={handleSubmit} className="updateProfil">
      <div className="updateProfil_field">
        <label htmlFor="password" className="updateProfil_label">
          Mot de passe :
        </label>
        <input
          className="updateProfil_input"
          type="password"
          id="password"
          name="password"
          value={dataPassword.password}
          onChange={handleChange}
        />
      </div>
      <div className="updateProfil_field">
        <label htmlFor="newPassword" className="updateProfil_label">
          Nouveau mot de passe :{" "}
        </label>
        <input
          className="updateProfil_input"
          type="password"
          id="newPassword"
          name="newPassword"
          value={dataPassword.newPassword}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="updateProfil_btn">
        Modifier
      </button>
    </form>
  );
};

export default UpdateUserPassword;
