import React from "react";
import { useNavigate } from "react-router";
import Login from "../../pages/login";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    navigate("/login");
    return <><Login/></>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
