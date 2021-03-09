import React from "react";
import LoginForm from "../../user/connexionForm/LoginForm";
import RegisterForm from "../../user/connexionForm/RegisterForm";
import { useParams } from "react-router-dom";

const ConnexionPage = () => {
  const params = useParams();

  return (
    <div className="connexion_page">
      {params.type === "inscription" ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

export default ConnexionPage;
