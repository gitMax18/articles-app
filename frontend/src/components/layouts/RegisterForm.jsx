import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions.js/connectUserAction";

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoading, isAuthenticate, error } = useSelector((state) => state.user);

  const { pseudo, email, password, confirmPassword } = credentials;

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
      pseudo,
      email,
      password,
    };

    if (confirmPassword === password) {
      dispatch(registerUser(dataUser));
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="form_title">Inscription</h1>
      <div className="form_fields">
        <label htmlFor="pseudo" className="form_label">
          Pseudo :
        </label>
        <input
          className="form_input"
          type="text"
          name="pseudo"
          id="pseudo"
          value={pseudo}
          onChange={handleChange}
        />
        <p className="form_errorMessage">{error && error.pseudo}</p>
      </div>

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

      <div className="form_fields">
        <label htmlFor="confirmPassword" className="form_label">
          Confirme mot de passe :
        </label>
        <input
          className="form_input"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="form_btn">
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;
