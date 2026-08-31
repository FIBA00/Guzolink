/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import { api, getConfiguredPath, unwrap } from "./api";
function request(method, key, { params, data, pathParams } = {}) {
  return api({
    method,
    url: getConfiguredPath(key, pathParams),
    params,
    data,
  }).then(unwrap);
}
export const productsApi = {
  list: params => request("get", "PRODUCTS", { params }),
  detail: id => request("get", "PRODUCT", { pathParams: { id } }),
  create: data => request("post", "PRODUCTS", { data }),
  update: (id, data) =>
    request("patch", "PRODUCT", { pathParams: { id }, data }),
  remove: id => request("delete", "PRODUCT", { pathParams: { id } }),
};
export const shopsApi = {
  list: params => request("get", "SHOPS", { params }),
  detail: slug => request("get", "SHOP", { pathParams: { slug } }),
  update: data => request("patch", "MERCHANT_SHOP", { data }),
};
export const ordersApi = {
  list: params => request("get", "ORDERS", { params }),
  detail: id => request("get", "ORDER", { pathParams: { id } }),
  create: data => request("post", "ORDERS", { data }),
  update: (id, data) => request("patch", "ORDER", { pathParams: { id }, data }),
};
export const authApi = {
  session: () => request("get", "AUTH_SESSION"),
  login: data => request("post", "AUTH_LOGIN", { data }),
  register: data => request("post", "AUTH_REGISTER", { data }),
  logout: () => request("post", "AUTH_LOGOUT"),
};
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
export const activitiesApi = {
  list: params => request("get", "ACTIVITIES", { params }),
  create: data => request("post", "ACTIVITIES", { data }),
  update: (id, data) =>
    request("patch", "ACTIVITY", { pathParams: { id }, data }),
};
export const adminApi = {
  storefronts: params => request("get", "ADMIN_STOREFRONTS", { params }),
  approveStorefront: (id, data) =>
    request("post", "ADMIN_STOREFRONT_APPROVE", { pathParams: { id }, data }),
  rejectStorefront: (id, data) =>
    request("post", "ADMIN_STOREFRONT_REJECT", { pathParams: { id }, data }),
};
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
export const commerceApi = {
  deliveryOptions: () => request("get", "DELIVERY_OPTIONS"),
  checkout: data => request("post", "CHECKOUT_SESSION", { data }),
  cancellation: (id, data) =>
    request("post", "ORDER_CANCELLATION", { pathParams: { id }, data }),
  refund: (id, data) =>
    request("post", "ORDER_REFUND", { pathParams: { id }, data }),
};
export const contentApi = {
  page: slug => request("get", "CONTENT_PAGE", { pathParams: { slug } }),
  help: () => request("get", "HELP_CONTENT"),
  onboarding: () => request("get", "MERCHANT_ONBOARDING"),
};
export const supportApi = {
  tickets: () => request("get", "SUPPORT_TICKETS"),
  createTicket: data => request("post", "SUPPORT_TICKETS", { data }),
  updateTicket: (id, data) =>
    request("patch", "SUPPORT_TICKET", { pathParams: { id }, data }),
};
export const growthApi = {
  preferences: () => request("get", "GROWTH_PREFERENCES"),
  updatePreferences: data => request("patch", "GROWTH_PREFERENCES", { data }),
  attribution: () => request("get", "ACQUISITION_ATTRIBUTION"),
  experiments: () => request("get", "EXPERIMENTS"),
};
export const operationsApi = {
  merchant: () => request("get", "MERCHANT_OPERATIONS"),
  updateFulfilment: (id, data) =>
    request("patch", "MERCHANT_FULFILMENT", { pathParams: { id }, data }),
  inviteTeam: data => request("post", "MERCHANT_TEAM", { data }),
  exportSales: () => request("post", "MERCHANT_SALES_EXPORT"),
};
export const governanceApi = {
  desk: () => request("get", "ADMIN_GOVERNANCE"),
  resubmit: (id, data) =>
    request("post", "ADMIN_STOREFRONT_RESUBMIT", { pathParams: { id }, data }),
};
