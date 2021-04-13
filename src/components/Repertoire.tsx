import React from "react";
import { User } from "../features/users/usersSlice";

interface Props {
  user: User;
}

export default function Repertoire({ user }: Props) {
  return <h3>{user.firstName}'s repertoire.</h3>;
}
