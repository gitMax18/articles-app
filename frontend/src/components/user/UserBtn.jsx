import React, { useRef, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logoutUser, resetAuthError } from "../../redux/actions.js/authUserAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const UserBtn = () => {
  const ref = useRef();
  const history = useHistory();

  const { isAuthenticate } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      toast.dark("Vous êtes déconnecté");
      history.push("/");
      dispatch(resetAuthError());
    };
  }, [isAuthenticate, history, dispatch]);

  const handleClickLogo = () => {
    ref.current.classList.toggle("hidden");
  };

  const handleClickLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="relative">
      <FaUserAlt onClick={handleClickLogo} className="text-3xl cursor-pointer " />
      <div
        className="absolute z-10 hidden overflow-hidden bg-indigo-500 rounded-lg shadow-lg w-72 top-full right-1/2"
        ref={ref}
      >
        <ul>
          <li>
            <Link
              className="block py-3 text-lg font-bold text-center hover:bg-indigo-400"
              to="/user/profil"
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              className="block py-3 text-lg font-bold text-center hover:bg-indigo-400"
              to="/article/nouveau"
            >
              Creer un article
            </Link>
          </li>
          <li>
            <Link
              className="block py-3 text-lg font-bold text-center hover:bg-indigo-400"
              to="/logout"
              onClick={handleClickLogout}
            >
              Se déconnecter
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserBtn;
