import { createAction } from "@reduxjs/toolkit";

interface ApiCallBeganPayload {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}

interface ApiCallSuccessPayload {
  headers: { [key: string]: string };
}

interface ApiCallFailedPayload {
  errors: { [key: string]: string };
}

export interface ApiCallBeganAction {
  type: typeof apiCallBegan.type;
  payload: ApiCallBeganPayload;
}

export interface ApiCallSuccessAction {
  type: typeof apiCallSuccess.type;
  payload: ApiCallSuccessPayload;
}

export interface ApiCallFailedAction {
  type: typeof apiCallFailed.type;
  payload: ApiCallFailedPayload;
}

export const apiCallBegan = createAction<ApiCallBeganPayload>("api/callBegan");
export const apiCallSuccess = createAction<ApiCallSuccessPayload>(
  "api/callSuccess"
);
export const apiCallFailed = createAction<ApiCallFailedPayload>(
  "api/callFailed"
);
