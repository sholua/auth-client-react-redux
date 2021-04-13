import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/users";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
