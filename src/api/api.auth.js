/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import request from "./client.js";
export const authApi = {
  session: () => request("get", "AUTH_SESSION"),
  login: data => request("post", "AUTH_LOGIN", { data }),
  register: data => request("post", "AUTH_REGISTER", { data }),
  logout: () => request("post", "AUTH_LOGOUT"),
};
