import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//register||method post
router.post("/register", registerController);

//login|| POST
router.post("/login", loginController);

//forggot password||POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  console.log("admin auth route hit");
  res.status(200).send({ ok: true });
});

//update-profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
