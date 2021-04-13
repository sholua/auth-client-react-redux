import React from "react";
import { User } from "../features/users/users";

interface Props {
  user: User;
}

export default function Repertoire({ user }: Props) {
  return <h3>{user.firstName}'s repertoire.</h3>;
}
