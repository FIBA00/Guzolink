import { createHandler } from "graphql-http/lib/use/express";
import { ProductRootSchema } from "./schema.js";

// Create GraphQL handler with context containing authenticated user (if any)
export const ProductRoute = createHandler({
  schema: ProductRootSchema,
  context: (request) => {
    // Express adds `user` via IsLoggedIn middleware for REST routes; 
    // for GraphQL we need to extract token manually?
    // For simplicity, we reuse the same middleware by attaching user to request earlier if needed.
    return { user: request.user };
  },
});
