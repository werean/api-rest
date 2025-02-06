import { Router } from "express";
import studentController from "../controllers/StudentController.js";
const router = new Router();
import loginRequired from "../middlewares/loginRequired.js";

router.get("/", studentController.index);
router.get("/:id", studentController.show);
router.post("/", studentController.store);
router.put("/:id", loginRequired, studentController.update);
router.delete("/:id", loginRequired, studentController.delete);

export default router;
