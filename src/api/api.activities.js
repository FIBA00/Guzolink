/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import request from "./client.js";
export const activitiesApi = {
  list: params => request("get", "ACTIVITIES", { params }),
  create: data => request("post", "ACTIVITIES", { data }),
  update: (id, data) =>
    request("patch", "ACTIVITY", { pathParams: { id }, data }),
};
