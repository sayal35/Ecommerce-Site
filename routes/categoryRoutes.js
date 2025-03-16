import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createcategoryController,
  deleteCategoryController,
  singleCategoryController,
  updatecategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createcategoryController
);

//update categort
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updatecategoryController
);

//getall category
router.get("/get-category", categoryController);
//singgle category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
