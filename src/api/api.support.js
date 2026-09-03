import request from "./client.js";
export const supportApi = {
  tickets: () => request("get", "SUPPORT_TICKETS"),
  createTicket: data => request("post", "SUPPORT_TICKETS", { data }),
  updateTicket: (id, data) =>
    request("patch", "SUPPORT_TICKET", { pathParams: { id }, data }),
};