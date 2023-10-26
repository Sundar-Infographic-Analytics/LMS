import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Login from "../../pages/login";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const location = useLocation();

 
useEffect (() =>{
  const validate = () =>{
   if (!jwtToken) {
      localStorage.setItem('previousLocation',location.pathname );
      navigate("/login");
      return <><Login/></>;
    }
  }
  validate();
},[jwtToken,navigate,location.pathname])
  
  return <>{children}</>;
};

export default ProtectedRoute;
