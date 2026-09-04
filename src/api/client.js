/** Style: Market Ledger — configurable resource adapters prevent endpoint assumptions in page components. */
import { api, getConfiguredPath, unwrap } from "./api";
export default function request(
  method,
  key,
  { params, data, pathParams } = {}
) {
  return api({
    method,
    url: getConfiguredPath(key, pathParams),
    params,
    data,
  }).then(unwrap);
}
