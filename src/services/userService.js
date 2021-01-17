import http from "./httpService";
import { apiUrl } from "../config.json";
import _pick from "lodash/pick";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, _pick(user, ["name", "email", "password"]));
}
