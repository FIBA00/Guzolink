import request from "./client.js";
export const contentApi = {
  page: slug => request("get", "CONTENT_PAGE", { pathParams: { slug } }),
  help: () => request("get", "HELP_CONTENT"),
  onboarding: () => request("get", "MERCHANT_ONBOARDING"),
};
