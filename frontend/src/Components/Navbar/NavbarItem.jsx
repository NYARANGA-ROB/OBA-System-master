import React from "react";
import { NavLink } from "react-router-dom";

const NavbarItems = ({ path, src, text }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => `navbar-link ${isActive && "active"}`}
    >
      <span>{text}</span>
    </NavLink>
  );
};

export default NavbarItems;
