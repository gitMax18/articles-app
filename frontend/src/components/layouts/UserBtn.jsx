import React, { useRef, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions.js/connectUserAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UserBtn = () => {
  const ref = useRef();
  const history = useHistory();

  const { isAuthenticate } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // peut etre a enlever
  useEffect(() => {
    if (!isAuthenticate) {
      history.push("/");
    }
  }, [isAuthenticate, history]);

  const handleClickLogo = () => {
    ref.current.classList.toggle("userBtn_infos-active");
  };

  const handleClickLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="userBtn">
      <FaUserAlt onClick={handleClickLogo} />
      <div className="userBtn_infos" ref={ref}>
        <ul>
          <li>
            <Link className="userBtn_link" to="/user/profil">
              Profil
            </Link>
          </li>
          <li>
            <Link className="userBtn_link" to="/article/nouveau">
              Creer un article
            </Link>
          </li>
          <li>
            <Link className="userBtn_link" to="/logout" onClick={handleClickLogout}>
              Se déconnecter
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserBtn;
