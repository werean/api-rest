import { Router } from "express";
import home from "../controllers/Home.js";
const router = new Router();

router.get("/", home.index);

export default router;
