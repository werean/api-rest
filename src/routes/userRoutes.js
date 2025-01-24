import { Router } from "express";
import userController from "../controllers/UserController.js";
const router = new Router();

router.post("/", userController.store);
export default router;
/*store/create => cria um novo usuário => POST
index => lista todos os usuários => GET
delete => apaga um usuário => DELETE
show => mostra um usuário => GET
update => atualiza um usuário => PATCH(Quando altera somente um valor)  PUT(Quando você pega um objeto inteiro e substitiu por um objeto inteiro)*/
