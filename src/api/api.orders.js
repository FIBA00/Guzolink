/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import request from "./client.js";
export const ordersApi = {
  list: params => request("get", "ORDERS", { params }),
  detail: id => request("get", "ORDER", { pathParams: { id } }),
  create: data => request("post", "ORDERS", { data }),
  update: (id, data) => request("patch", "ORDER", { pathParams: { id }, data }),
};
