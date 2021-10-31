import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader";
import { resetPassword, resetAuthError } from "../../redux/actions.js/authUserAction";
import { useParams } from "react-router-dom";
import { useIsSamePasswords } from "../../utils/hooks";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [dataPassword, setDataPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const { passwordError, checkPassword } = useIsSamePasswords();

  const params = useParams();

  const { error, isLoading, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    message && toast.dark(message);
    return () => {
      dispatch(resetAuthError());
    };
  }, [message, dispatch]);

  const handleChange = (e) => {
    setDataPassword({ ...dataPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSamePassword = checkPassword(
      dataPassword.password,
      dataPassword.confirmPassword
    );
    if (isSamePassword) {
      dispatch(resetPassword(params.token, dataPassword.password));
    }
  };

  return (
    <form
      className="absolute w-11/12 max-w-lg p-10 mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto mt-3 text-3xl text-indigo-900 border-b-4 border-indigo-900 mb-9 w-max">
        Réinitialisation du mot de passe
      </h1>

      <div className="mb-4">
        <label htmlFor="password" className="label">
          Mot de passe :
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          value={dataPassword.password}
          onChange={handleChange}
        />
        <p className="formError">{error && error.password}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="label">
          confimé mot de passe :
        </label>
        <input
          className="input"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={dataPassword.confirmPassword}
          onChange={handleChange}
        />
        <p className="formError">{passwordError}</p>
      </div>

      <button
        type="submit"
        className="block mx-auto text-white bg-green-500 my-9 btn w-max"
      >
        Valider
      </button>

      {isLoading && (
        <div className="flex justify-center w-full">
          <Loader />
        </div>
      )}
    </form>
  );
};

export default ResetPassword;
