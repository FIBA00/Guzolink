import request from "../../../api/client.js";
export const adminApi = {
  storefronts: params => request("get", "ADMIN_STOREFRONTS", { params }),
  approveStorefront: (id, data) =>
    request("post", "ADMIN_STOREFRONT_APPROVE", { pathParams: { id }, data }),
  rejectStorefront: (id, data) =>
    request("post", "ADMIN_STOREFRONT_REJECT", { pathParams: { id }, data }),
};
