import { createAction } from "@reduxjs/toolkit";

export interface ApiCallBegan {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  onStart: string;
  onSuccess: string;
  onError: string;
}

export const apiCallBegan = createAction<ApiCallBegan>("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");
