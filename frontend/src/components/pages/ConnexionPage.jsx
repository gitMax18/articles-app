import React, { useEffect } from "react";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastConfig from "../../utils/toast_config";

const ConnexionPage = () => {
  const params = useParams();
  const { message, isAuthenticate } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticate) {
      toast.dark(message);
    }
  }, [isAuthenticate]);

  return (
    <div className="relative bg-no-repeat bg-cover min-h-almost bg-connexion ">
      {params.type === "inscription" ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

export default ConnexionPage;
