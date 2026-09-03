/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import request from "./client.js";
export const productsApi = {
  list: params => request("get", "PRODUCTS", { params }),
  detail: id => request("get", "PRODUCT", { pathParams: { id } }),
  create: data => request("post", "PRODUCTS", { data }),
  update: (id, data) =>
    request("patch", "PRODUCT", { pathParams: { id }, data }),
  remove: id => request("delete", "PRODUCT", { pathParams: { id } }),
};
