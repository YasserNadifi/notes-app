import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { verifyJwt } from '../services/verifyJwt'
import { useState,useEffect } from 'react'

export const ProtectedRoute = () => {
    const [isJwtValid, setIsJwtValid] = useState(null); // null means loading

    useEffect(() => {
      const checkJwt = async () => {
        const token = localStorage.getItem('jwt');
        console.log("jwt in ProtectedRoute: " + token);
        // If no token, set validity to false immediately
        if (!token) {
          setIsJwtValid(false);
          return;
        }
  
        const valid = await verifyJwt(token);
        console.log("verifyJwt(token) returned:", valid);
        setIsJwtValid(valid);
      };
  
      checkJwt();
    }, []);
  
    // While checking, display a loading message or spinner
    if (isJwtValid === null) {
      return <div>Loading...</div>;
    }
    return (
    isJwtValid ? <Outlet /> : <Navigate to="/login" replace state={{notification : "There has been an authentication error. Please try again"}}/>
  );
}
