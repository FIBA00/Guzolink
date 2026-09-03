/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import request from "./client.js";
export const shopsApi = {
  list: params => request("get", "SHOPS", { params }),
  detail: slug => request("get", "SHOP", { pathParams: { slug } }),
  update: data => request("patch", "MERCHANT_SHOP", { data }),
};
