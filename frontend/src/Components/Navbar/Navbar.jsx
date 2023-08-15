import React, { useContext } from "react";
import NavbarItem from "./NavbarItem";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const [user, setUser] = useContext(AuthContext);
  return (
    <section className="navbar">
      <nav className="navbar-contanier">
        {user.isAdmin
          ? [
              { path: "/", text: "Profile" },
              { path: "/manageFaculty", text: "Manage Faculty" },
              { path: "/resetPassword", text: "Reset Password" },
              { path: "/logout", text: "Logout" },
            ].map((items, i) => {
              return <NavbarItem {...items} key={i} />;
            })
          : [
              { path: "/", text: "Profile" },
              { path: "/courses", text: "Courses" },
              { path: "/resetPassword", text: "Reset Password" },
              { path: "/logout", text: "Logout" },
            ].map((items, i) => {
              return <NavbarItem {...items} key={i} />;
            })}
      </nav>
    </section>
  );
};

export default Navbar;
