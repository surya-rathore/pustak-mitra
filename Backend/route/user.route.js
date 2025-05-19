import express from "express";
import { signup, login, contact } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/contact",contact);
export default router;