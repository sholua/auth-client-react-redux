import React from "react";
import { User } from "../users/usersSlice";

interface Props {
  user: User;
}

export default function Program({ user }: Props) {
  return <h3>{user.firstName}'s propgram for current semester</h3>;
}
