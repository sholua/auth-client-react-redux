import { Action } from "redux";
import {
  ApiCallBeganAction,
  ApiCallSuccessAction,
  ApiCallFailedAction,
} from "./apiActions";
import {
  AuthLogoutAction,
  AuthReceivedAction,
  AuthRequestFailedAction,
} from "./auth";

export type ApiActions =
  | ApiCallBeganAction
  | ApiCallSuccessAction
  | ApiCallFailedAction;

type AuthActions =
  | AuthReceivedAction
  | AuthReceivedAction
  | AuthLogoutAction
  | AuthRequestFailedAction;

export type AppAction = Action & (AuthActions | ApiActions);
