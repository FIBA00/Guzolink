import express from "express";

const UserRoute = express.Router();
import { IsLoggedIn } from "../middlewares/auth.middleware.js";
import IsAdmin from "../middlewares/role.middleware.js";
import {
  GetAllUsers,
  GetUserProfile,
  RegisterUser,
  LoginUser,
  DeleteUser,
  UpdateUser

} from "../controllers/user.controller.js";

// admin only
UserRoute.get("/all", IsLoggedIn, IsAdmin, GetAllUsers);
UserRoute.delete("/", IsAdmin, DeleteUser);


// public only
UserRoute.get("/profile/:id", IsLoggedIn, GetUserProfile);
UserRoute.post("/register", RegisterUser);
UserRoute.post("/login",  LoginUser);
UserRoute.post("/update/:id", IsLoggedIn, UpdateUser)


// TODO: upcoming routes
// UserRoute.post("/forgotPassword", IsLoggedIn, ForgotPassword)

export default UserRoute;
