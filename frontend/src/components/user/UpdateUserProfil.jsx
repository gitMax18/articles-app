import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfil, resetUserError } from "../../redux/actions.js/userAction";

const UpdateUserProfil = () => {
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { pseudo, email } = user;

  const [dataUser, setDataUser] = useState({
    pseudo: pseudo,
    email: email,
  });

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(resetUserError());
      }
    };
  }, [dispatch, error]);

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfil(dataUser));
  };

  return (
    <form onSubmit={handleSubmit} className="updateProfil">
      <div className="mb-4">
        <label htmlFor="pseudo" className="label">
          Pseudo :
        </label>
        <input
          className="input"
          type="text"
          id="pseudo"
          name="pseudo"
          value={dataUser.pseudo}
          onChange={handleChange}
        />
        <p className="formError">{error && error.pseudo}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="label">
          Email :
        </label>
        <input
          className="input"
          type="text"
          id="email"
          name="email"
          value={dataUser.email}
          onChange={handleChange}
        />
        <p className="formError">{error && error.email}</p>
      </div>
      <button type="submit" className="block mx-auto my-4 text-white bg-green-500 btn">
        Modifier
      </button>
    </form>
  );
};

export default UpdateUserProfil;
