import request from "./client.js";
export const operationsApi = {
  merchant: () => request("get", "MERCHANT_OPERATIONS"),
  updateFulfilment: (id, data) =>
    request("patch", "MERCHANT_FULFILMENT", { pathParams: { id }, data }),
  inviteTeam: data => request("post", "MERCHANT_TEAM", { data }),
  exportSales: () => request("post", "MERCHANT_SALES_EXPORT"),
};
