import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import authReducer, { AuthSlice } from "../features/auth/authSlice";
import { EntitiesReducer } from "./entities";

export interface AppState {
  entities: EntitiesReducer;
  auth: AuthSlice;
}

export default combineReducers<AppState>({
  entities: entitiesReducer,
  auth: authReducer,
});
