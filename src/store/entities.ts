import { combineReducers } from "redux";
import usersReducer, { UsersSlice } from "./users";

export interface EntitiesReducer {
  users: UsersSlice;
}

export default combineReducers<EntitiesReducer>({
  users: usersReducer,
});
