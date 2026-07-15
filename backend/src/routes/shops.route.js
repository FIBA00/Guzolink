import express from "express";
const ShopRoute = express.Router();
import { IsLoggedIn } from "../middlewares/auth.middleware.js";

import {
  CreateMerchantShop,
  GetMerchantShopDetails,
  GetMerchantShops,
  DeleteMerchantShop,
  UpdateMerchantShop
} from "../controllers/shops.controller.js";

ShopRoute.get("/", IsLoggedIn, GetMerchantShops);
ShopRoute.get("/:shopId", IsLoggedIn, GetMerchantShopDetails);
ShopRoute.post("/", IsLoggedIn, CreateMerchantShop);
ShopRoute.delete("/:shopId", IsLoggedIn, DeleteMerchantShop)
ShopRoute.put("/:id", IsLoggedIn, UpdateMerchantShop)

export default ShopRoute;
