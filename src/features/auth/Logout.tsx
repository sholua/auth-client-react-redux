import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { getRefreshToken } from "../../services/authService";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (refreshToken) dispatch(logout(refreshToken));
  }, [dispatch]);

  return <Redirect to="/home" />;
};

export default Logout;
