import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserPassword, resetUserError } from "../../redux/actions.js/userAction";

const UpdateUserPassword = () => {
  const [dataPassword, setDataPassword] = useState({
    password: "",
    newPassword: "",
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(resetUserError());
      }
    };
  }, [dispatch, error]);

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
      <div className="mb-4">
        <label htmlFor="password" className="label">
          Mot de passe :
        </label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          value={dataPassword.password}
          onChange={handleChange}
        />
        <p className="formError">{error && typeof error === "string" && error}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="newPassword" className="label">
          Nouveau mot de passe :
        </label>
        <input
          className="input"
          type="password"
          id="newPassword"
          name="newPassword"
          value={dataPassword.newPassword}
          onChange={handleChange}
        />
        <p className="formError">
          {error && typeof error === "object" && error.password}
        </p>
      </div>
      <button type="submit" className="block mx-auto text-white bg-green-500 btn">
        Modifier
      </button>
    </form>
  );
};

export default UpdateUserPassword;
