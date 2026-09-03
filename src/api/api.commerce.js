import request from "./client.js";
export const commerceApi = {
  deliveryOptions: () => request("get", "DELIVERY_OPTIONS"),
  checkout: data => request("post", "CHECKOUT_SESSION", { data }),
  cancellation: (id, data) =>
    request("post", "ORDER_CANCELLATION", { pathParams: { id }, data }),
  refund: (id, data) =>
    request("post", "ORDER_REFUND", { pathParams: { id }, data }),
};
