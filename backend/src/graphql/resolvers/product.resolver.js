import Product from "../../models/product.model.js";

export const ProductResolvers = {
  //   queries
  getAllShopProducts: async () => {
    return await Product.find();
  },
  shopProducts: async ({ shopId }) => {
    return await Product.find({ shop: shopId });
  },

  //   mutation
  createProduct: async ({ input }, { user }) => {
    try {
      if (!user) throw new Error("You are not AUTHENTICATED ");

      //   get the details from input
      const {
        name,
        price,
        category,
        shop: shopId,
        description,
        stock,
        image,
      } = input;
      if (!name || !price || !category || !shopId) {
        throw new Error("Name, price, category, and shop are required");
      }
      //   save the product
      const product = await Product.create({
        name,
        description,
        price,
        stock: stock || 0,
        category,
        shop: shopId,
        image,
      });
      return product;
    } catch (error) {
      console.log("Error while creating a product: ", error.message);
    }
  },
};
