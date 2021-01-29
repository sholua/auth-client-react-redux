import _pick from "lodash/pick";
import { apiUrl } from "../config.json";
import { backend } from "../apis/backend";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return backend.post(apiEndpoint, _pick(user, ["name", "email", "password"]));
}
