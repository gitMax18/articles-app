import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfil } from "../../../redux/actions.js/userAction";

const UpdateUserProfil = () => {
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pseudo, email } = user;

  const [dataUser, setDataUser] = useState({
    pseudo: pseudo,
    email: email,
  });

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfil(dataUser));
  };

  return (
    <form onSubmit={handleSubmit} className="updateProfil">
      <div className="updateProfil_field">
        <label htmlFor="pseudo" className="updateProfil_label">
          Pseudo :
        </label>
        <input
          className="updateProfil_input"
          type="text"
          id="pseudo"
          name="pseudo"
          value={dataUser.pseudo}
          onChange={handleChange}
        />
      </div>
      <div className="updateProfil_field">
        <label htmlFor="email" className="updateProfil_label">
          Email :
        </label>
        <input
          className="updateProfil_input"
          type="text"
          id="email"
          name="email"
          value={dataUser.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="updateProfil_btn">
        Modifier
      </button>
    </form>
  );
};

export default UpdateUserProfil;
