import request from "./client.js";
export const accountApi = {
  profile: () => request("get", "ACCOUNT_PROFILE"),
  updateProfile: data => request("patch", "ACCOUNT_PROFILE", { data }),
  addresses: () => request("get", "ACCOUNT_ADDRESSES"),
  createAddress: data => request("post", "ACCOUNT_ADDRESSES", { data }),
  updateAddress: (id, data) =>
    request("patch", "ACCOUNT_ADDRESS", { pathParams: { id }, data }),
  removeAddress: id =>
    request("delete", "ACCOUNT_ADDRESS", { pathParams: { id } }),
  saved: () => request("get", "ACCOUNT_SAVED"),
  preferences: () => request("get", "ACCOUNT_PREFERENCES"),
  updatePreferences: data => request("patch", "ACCOUNT_PREFERENCES", { data }),
  exportData: () => request("post", "ACCOUNT_EXPORT"),
};

