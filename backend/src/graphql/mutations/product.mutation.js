import {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLID,
} from "graphql";
import ProductType from "../types/product.type.js";
import { ProductResolvers } from "../resolvers/product.resolver.js";
const ProductMutations = {
  name: "ProductMutations",
  fields: {
    // mutations
    createProduct: {
        type: ProductType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            price: { type: new GraphQLNonNull(GraphQLFloat) },
            stock: { type: new GraphQLNonNull(GraphQLInt) },
            category: { type: new GraphQLNonNull(GraphQLID) },
            shop: { type: new GraphQLNonNull(GraphQLID) },
            image: { type: GraphQLString },
        },
        resolver: ProductResolvers.createProduct,
        }
    },
    deleteProduct: {},
    updateProduct: {},
};

export default ProductMutations;
