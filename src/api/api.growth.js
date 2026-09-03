import request from "./client.js";
export const growthApi = {
  preferences: () => request("get", "GROWTH_PREFERENCES"),
  updatePreferences: data => request("patch", "GROWTH_PREFERENCES", { data }),
  attribution: () => request("get", "ACQUISITION_ATTRIBUTION"),
  experiments: () => request("get", "EXPERIMENTS"),
};