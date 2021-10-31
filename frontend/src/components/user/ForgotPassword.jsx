import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword, resetAuthError } from "../../redux/actions.js/authUserAction";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { error, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    message && toast.dark(message);
    error && toast.dark(error);
    return () => {
      dispatch(resetAuthError());
    };
  }, [message, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <form
      className="absolute w-11/12 max-w-lg p-10 mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2"
      onSubmit={handleSubmit}
    >
      <h1 className="mx-auto mt-3 text-3xl text-indigo-900 border-b-4 border-indigo-900 mb-9 w-max">
        Mot de passe oublié
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="formError">{error && error.email}</p>
      </div>
      <button className="block mx-auto bg-green-400 btn">Envoyer</button>
      {isLoading && (
        <div className="flex justify-center w-full">
          <Loader />
        </div>
      )}
    </form>
  );
};

export default ForgotPassword;
