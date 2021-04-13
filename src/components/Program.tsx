import React from "react";
import { User } from "../features/users/users";

interface Props {
  user: User;
}

export default function Program({ user }: Props) {
  return <h3>{user.firstName}'s propgram for current semester</h3>;
}
