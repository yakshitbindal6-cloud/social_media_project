
import express from "express";
import { register_user, modifyUser, deleteUser, find_user } from "../controller/user.controller.js";
import validateParam from "../middlewares/validateParam.js";
import { createUserSchema,updateUserSchema } from "../dtos/user.dto.js";
import { validate } from "../middlewares/validation.js";
const router = express.Router();

// Create user
router.post("/", validate(createUserSchema),register_user);
// Get user by id (user id passed in params)
router.get("/:id", validateParam("id"), find_user);
// Update user by id (user id passed in params)
router.put("/:id", validateParam("id"),validate(updateUserSchema), modifyUser);
// Delete user by id (user id passed in params)
router.delete("/:id", validateParam("id"), deleteUser);

export default router;
