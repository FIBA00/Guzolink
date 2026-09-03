/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import request from "../../../api/client.js";
export const merchantApi = {
  overview: () => request("get", "MERCHANT_OVERVIEW"),
  customers: params => request("get", "CUSTOMERS", { params }),
  analytics: params => request("get", "MERCHANT_ANALYTICS", { params }),
  products: params => request("get", "MERCHANT_PRODUCTS", { params }),
  createProduct: data => request("post", "MERCHANT_PRODUCTS", { data }),
  updateProduct: (id, data) =>
    request("patch", "MERCHANT_PRODUCT", { pathParams: { id }, data }),
  removeProduct: id =>
    request("delete", "MERCHANT_PRODUCT", { pathParams: { id } }),
  shop: () => request("get", "MERCHANT_SHOP"),
  createShop: data => request("post", "MERCHANT_SHOP", { data }),
  updateShop: data => request("patch", "MERCHANT_SHOP", { data }),
  removeShop: () => request("delete", "MERCHANT_SHOP"),
  publishShop: data => request("post", "MERCHANT_SHOP_PUBLISH", { data }),
  settings: () => request("get", "MERCHANT_SETTINGS"),
  updateSettings: data => request("patch", "MERCHANT_SETTINGS", { data }),
};
