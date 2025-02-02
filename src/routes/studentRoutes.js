import { Router } from "express";
import studentController from "../controllers/StudentController.js";
const router = new Router();
import loginRequired from "../middlewares/loginRequired.js"; //usar isso nas rotas que eu queira que seja necessário login

router.get("/", studentController.index); //list all
router.get("/:id", studentController.show); // list one
router.post("/", studentController.store); // create
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);

export default router;
