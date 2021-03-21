import React from "react";
import { User } from "../store/users";
import ProfileAvatarForm from "./ProfileAvatarForm";

interface Props {
  user: User;
}

export default function ProfileDetails({ user }: Props) {
  return (
    <div>
      <h3>Profile details for: {user.firstName}</h3>
      {user.avatar && (
        <img
          src={`/api/profile/avatar/${user.avatar}`}
          alt={user.firstName}
          width="200"
        />
      )}
      <ProfileAvatarForm />
    </div>
  );
}
