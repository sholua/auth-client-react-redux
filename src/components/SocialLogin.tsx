import React from "react";

interface SocialLoginProps {
  provider: string;
}

export const SocialLogin = ({ provider }: SocialLoginProps): JSX.Element => {
  const handleAuth = (provider: string) => {
    (window as any).authenticateCallback = function (
      accessToken: string,
      refreshToken: string
    ) {
      console.log("Tokens!!!!!!!!", accessToken, refreshToken);
    };

    window.open(`/api/auth/${provider}`);
  };

  return (
    <button onClick={() => handleAuth(provider)}>Auth with Google+</button>
  );
};
