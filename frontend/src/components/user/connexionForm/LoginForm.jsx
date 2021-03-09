import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions.js/authUserAction";
import { Link } from "react-router-dom";

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
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form_title">Connexion</h1>
      <div className="form_fields">
        <label htmlFor="email" className="form_label">
          Email :
        </label>
        <input
          className="form_input"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <p className="form_errorMessage">{error && error.email}</p>
      </div>

      <div className="form_fields">
        <label htmlFor="password" className="form_label">
          Mot de passe :
        </label>
        <input
          className="form_input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <p className="form_errorMessage">{error && error.password}</p>
      </div>

      <button type="submit" className="form_btn">
        Se connecter
      </button>

      <div className="form_redirection">
        Pas encore de compte ? <br />{" "}
        <Link to="/connexion/inscription">Créer un compte</Link>
      </div>
    </form>
  );
};

export default LoginForm;
