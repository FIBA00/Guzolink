import request from "../../../api/client.js";
export const governanceApi = {
  desk: () => request("get", "ADMIN_GOVERNANCE"),
  resubmit: (id, data) =>
    request("post", "ADMIN_STOREFRONT_RESUBMIT", { pathParams: { id }, data }),
};
