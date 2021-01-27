import axios from "axios";
import config from "../config.json";

export const backend = axios.create({
  baseURL: config.apiUrl,
});
