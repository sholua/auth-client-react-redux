import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <Redirect to="/users" />;
};

export default Logout;
