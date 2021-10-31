import React, { useCallback, useEffect } from "react";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ForgotPassword from "../user/ForgotPassword";
import ResetPassword from "../user/ResetPassword";

const ConnexionPage = () => {
  const params = useParams();
  const { message, isAuthenticate } = useSelector((state) => state.auth);

  const getConnexionPage = useCallback(() => {
    switch (params.type) {
      case "inscription":
        return <RegisterForm />;

      case "se_connecter":
        return <LoginForm />;

      case "forgotPassword":
        return <ForgotPassword />;

      case "resetPassword":
        return <ResetPassword />;
      default:
        return "page introuvable"; // a corriger avec erreur 404
    }
  }, [params]);

  const displayConnexion = getConnexionPage();

  useEffect(() => {
    if (isAuthenticate) {
      toast.dark(message);
    }
  }, [isAuthenticate]);

  return (
    <div className="relative bg-no-repeat bg-cover min-h-almost bg-connexion ">
      {/* {params.type === "inscription" ? <RegisterForm /> : <LoginForm />} */}
      {displayConnexion}
    </div>
  );
};

export default ConnexionPage;
