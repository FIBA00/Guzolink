import express from "express";
const MarketPlaceRoute = express.Router();
import { GetAllShops } from "../controllers/shops.controller.js";

MarketPlaceRoute.get("/shops", GetAllShops);

export default MarketPlaceRoute;
