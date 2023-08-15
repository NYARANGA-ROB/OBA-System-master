import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
const ProtectiveRoutes = ({ children }) => {
  const [user] = useContext(AuthContext);
  return Object.keys(user).length > 0 ? children : <Navigate to="/login" />;
};

export default ProtectiveRoutes;
