import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import style from "./NavStyle/NavStyle.module.css";

export const Nav = () => {
  const history = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history("/");
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <span className={`brand-logo ${style.title}`}>Link Shortener</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>

          <li>
            <a href="/" onClick={logoutHandler}>
              Exit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
