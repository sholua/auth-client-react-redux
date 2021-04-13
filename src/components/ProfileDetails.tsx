import React from "react";
import { User } from "../features/users/usersSlice";
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
          src={`/api/profile/avatar/${user.avatar}?width=100`}
          alt={user.firstName}
        />
      )}
      <ProfileAvatarForm />
    </div>
  );
}
