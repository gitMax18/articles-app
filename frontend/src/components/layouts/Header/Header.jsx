import React from "react";
import { Link, NavLink } from "react-router-dom";
import UserBtn from "../../user/UserBtn/UserBtn";
import { useCheckLocalStorageUser } from "../../../hooks";

const Header = () => {
  const user = useCheckLocalStorageUser();

  return (
    <header className="header">
      <div className="header_logo">
        <Link to="/">LOGO</Link>
      </div>
      <nav className="header_nav">
        <ul>
          <li>
            <NavLink
              exact
              className="header_nav_link"
              activeClassName="header_nav_link-active"
              to="/">
              Acceuil
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header_nav_link"
              activeClassName="header_nav_link-active"
              to="/articles">
              Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              className="header_nav_link"
              activeClassName="header_nav_link-active"
              to="/a-propos">
              A propos
            </NavLink>
          </li>

          {user ? (
            <li className="header_nav_btn">
              <UserBtn />
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  className="header_nav_link"
                  activeClassName="header_nav_link-active"
                  to="/connexion/se_connecter">
                  Connexion
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
