// shared/lib/graphqlClient.js
//
// Plain-fetch GraphQL client — no Apollo needed for a single query/mutation
// helper. Notice this looks almost identical to a REST call; the only real
// difference is the request BODY shape (query + variables) and that GraphQL
// always POSTs to one endpoint. Auth works exactly the same way as REST:
// same Authorization header, same token, same source of truth (AuthContext).

export async function graphqlRequest(query, variables, token) {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await res.json();

  if (errors?.length) {
    // GraphQL can return HTTP 200 even when the query failed — errors live
    // in the response body, not the status code. Surface the first one.
    throw new Error(errors[0].message);
  }

  return data;
}