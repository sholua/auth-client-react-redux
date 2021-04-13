import { Action } from "redux";
import {
  ApiCallBeganAction,
  ApiCallSuccessAction,
  ApiCallFailedAction,
} from "./apiActions";
import {
  AuthLogoutAction,
  AuthReceivedAction,
  AuthRequestedAction,
  AuthRequestFailedAction,
} from "../features/auth/authSlice";

export type ApiActions =
  | ApiCallBeganAction
  | ApiCallSuccessAction
  | ApiCallFailedAction;

type AuthActions =
  | AuthRequestedAction
  | AuthReceivedAction
  | AuthLogoutAction
  | AuthRequestFailedAction;

export type AppAction = Action & (AuthActions | ApiActions);
