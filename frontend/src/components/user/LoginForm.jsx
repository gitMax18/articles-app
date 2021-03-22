import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions.js/authUserAction";
import { Link } from "react-router-dom";
import Loader from "../layouts/Loader";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoading, isAuthenticate, error } = useSelector((state) => state.auth);

  const { email, password } = credentials;

  useEffect(() => {
    if (isAuthenticate) {
      history.replace("/");
    }
  }, [isAuthenticate, history]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

    // check if is the same password
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataUser = {
      email,
      password,
    };

    dispatch(loginUser(dataUser));
  };

  return (
    <form
      className="absolute w-11/12 max-w-lg p-10 mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto mt-3 text-3xl text-indigo-900 border-b-4 border-indigo-900 mb-9 w-max">
        Connexion
      </h1>
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

      <button
        type="submit"
        className="block mx-auto text-white bg-green-500 my-9 btn w-max"
      >
        Se connecter
      </button>

      {isLoading && (
        <div className="flex justify-center w-full">
          <Loader />
        </div>
      )}

      <div className="text-sm">
        Pas encore de compte ? <br />
        <Link to="/connexion/inscription" className="text-indigo-900">
          Créer un compte
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
