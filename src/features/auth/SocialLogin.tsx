import React from "react";
import { loginWithJwt } from "../../services/authService";
import { getCurrentUser } from "./authSlice";
import { useDispatch } from "react-redux";

interface SocialLoginProps {
  provider: string;
}

export const SocialLogin = ({ provider }: SocialLoginProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleAuth = (provider: string) => {
    (window as any).authenticateCallback = function (
      accessToken: string,
      refreshToken: string
    ) {
      loginWithJwt(accessToken, refreshToken);
      dispatch(getCurrentUser());
    };

    window.open(`/api/auth/${provider}`);
  };

  return (
    <button onClick={() => handleAuth(provider)}>Auth with {provider}</button>
  );
};
