import { Router } from "express";
import home from "../controllers/HomeController.js";
const router = new Router();

router.get("/", home.index);

export default router;
