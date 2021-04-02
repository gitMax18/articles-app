import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions.js/authUserAction";
import { Link } from "react-router-dom";
import { resetAuthError } from "../../redux/actions.js/authUserAction";
import Loader from "../layouts/Loader";
import { useIsSamePasswords } from "../../utils/hooks";

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoading, isAuthenticate, error } = useSelector((state) => state.auth);

  const { pseudo, email, password, confirmPassword } = credentials;

  const { isSamePassword, checkPassword, passwordError } = useIsSamePasswords();

  useEffect(() => {
    if (isAuthenticate) {
      history.replace("/");
    }
  }, [isAuthenticate, history]);

  useEffect(() => {
    dispatch(resetAuthError());
  }, [dispatch]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataUser = {
      pseudo,
      email,
      password,
    };

    checkPassword(password, confirmPassword);

    if (isSamePassword) {
      dispatch(registerUser(dataUser));
    }
  };

  return (
    <form
      className="absolute w-11/12 max-w-lg p-10 mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto mt-3 text-3xl text-indigo-900 border-b-4 border-indigo-900 mb-9 w-max">
        Inscription
      </h1>
      <div className="mb-4">
        <label htmlFor="pseudo" className="label">
          Pseudo :
        </label>
        <input
          className="input"
          type="text"
          name="pseudo"
          id="pseudo"
          value={pseudo}
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
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <p className="formError">{error && error.email}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="label">
          Mot de passe :
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <p className="formError">{error && error.password}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="label">
          Confirme mot de passe :
        </label>
        <input
          className="input"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <p className="formError">{passwordError}</p>
      </div>

      <button
        type="submit"
        className="block mx-auto text-white bg-green-500 my-9 btn w-max"
      >
        S'inscrire
      </button>

      {isLoading && (
        <div className="flex justify-center w-full">
          <Loader />
        </div>
      )}

      <div className="text-sm">
        Déjà un compte ? <br />
        <Link to="/connexion/se_connecter" className="text-indigo-900">
          Se connecter
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
