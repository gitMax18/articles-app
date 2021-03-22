import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import UserBtn from "../user/UserBtn";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../redux/actions.js/authUserAction";

const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  const menuRef = useRef();

  const handleClick = () => {
    if (menuRef.current.classList.contains("hidden")) {
      menuRef.current.classList.replace("hidden", "flex");
    } else {
      menuRef.current.classList.replace("flex", "hidden");
    }
  };

  return (
    <header className="fixed top-0 z-10 grid items-center w-full h-16 grid-cols-3 text-white bg-indigo-900">
      <div className="pl-6 2xl:pl-16">
        <Link to="/" className="text-4xl">
          THOT
        </Link>
      </div>
      <nav className="justify-self-center">
        <GiHamburgerMenu
          className="text-4xl cursor-pointer lg:hidden"
          onClick={handleClick}
        />
        <ul
          className="absolute left-0 z-10 flex-col hidden w-screen text-lg top-16 lg:flex-row lg:static lg:flex lg:w-max"
          ref={menuRef}
        >
          <li>
            <NavLink
              exact
              className="block px-6 py-4 text-center bg-indigo-900 hover:bg-indigo-800"
              activeClassName="text-green-500 font-bold"
              to="/"
            >
              ACCEUIL
            </NavLink>
          </li>
          <li>
            <NavLink
              className="block px-6 py-4 text-center bg-indigo-900 hover:bg-indigo-800"
              activeClassName="text-green-500 font-bold"
              to="/articles"
            >
              ARTICLES
            </NavLink>
          </li>
          <li>
            <NavLink
              className="block px-6 py-4 text-center bg-indigo-900 hover:bg-indigo-800"
              activeClassName="text-green-500 font-bold"
              to="/a-propos"
            >
              A PROPOS
            </NavLink>
          </li>
        </ul>
      </nav>

      {user ? (
        <div className="mr-6 2xl:mr-16 justify-self-end">
          <UserBtn />
        </div>
      ) : (
        <>
          <div className="mr-6 2xl:mr-16 justify-self-end">
            <NavLink
              className="font-bold text-green-400 border-2 border-green-400 btn hover:bg-green-400 hover:text-white "
              activeClassName="header_nav_link-active"
              to="/connexion/se_connecter"
            >
              CONNEXION
            </NavLink>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
