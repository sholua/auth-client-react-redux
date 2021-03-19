import React from "react";
import { User } from "../store/users";

interface Props {
  user: User;
}

export default function ProfileDetails({ user }: Props) {
  return <h3>Profile details for: {user.firstName}</h3>;
}
