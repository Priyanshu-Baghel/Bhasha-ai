import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const ProtectedRoute = (props) =>  {
    const {Component} = props;
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/signin");
        }
    })


  return (
    <>
        <Component />
    </>
  )
}

export default ProtectedRoute