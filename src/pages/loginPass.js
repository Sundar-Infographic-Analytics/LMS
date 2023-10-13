import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function LoginPass() {
  const { jwtToken, userName } = useParams();
  const navigate = useNavigate(); // to naviagte

  useEffect(()=>{
    localStorage.setItem("userName:", userName);
    localStorage.setItem("jwtToken", jwtToken);
    const decodedToken = jwt_decode(jwtToken);
    const expirationTime = decodedToken.exp * 1000;
    localStorage.setItem("jwtTokenExpiration", expirationTime);
    navigate("/");  
  },[jwtToken, userName, navigate])

  
  return (
    <div>
        Loading...
    </div>
  );
}
