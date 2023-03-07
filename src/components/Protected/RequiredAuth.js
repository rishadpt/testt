import React, { useEffect, useState } from "react";
import { useAuth } from "./Protected";
import { useNavigate } from "react-router-dom";
import { Auth as Guard } from "aws-amplify";
import awsconfig from "../../aws-exports";

export default function RequiredAuth({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();
  Guard.configure(awsconfig);
  
  async function checkAuthState() {
    try {
     const user = await Guard.currentAuthenticatedUser();
     const data = await Guard.currentSession();
      localStorage.setItem("token",data.idToken.jwtToken)
      console.log(user);
      auth.setloginVerify(true)
    } catch (err) {
      const data = await Guard.currentSession();
      localStorage.setItem("token",data.idToken.jwtToken)
      navigate("/signin")     

    }
  }
  
  useEffect(() => {
    checkAuthState();
  }, [auth.loginVerify]);

 

  useEffect(() => {
    if (auth.loginVerify) {
      return children;
    } else {
      navigate("/signin");
    }
  }, [auth.loginVerify])
}
