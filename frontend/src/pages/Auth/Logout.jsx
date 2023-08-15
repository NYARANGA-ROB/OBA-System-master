import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    localStorage.clear();
    setUser({});
  }, []);
  return <Navigate to="/" />;
};

export default Logout;
