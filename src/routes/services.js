import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { checkToken } from "../utils/index.js";

const servicesRouter = Router();

servicesRouter.post("/auth/sign", userController.sign);
servicesRouter.post("/auth/register", userController.register);
servicesRouter.post("/refresh-token", userController.refreshToken);
servicesRouter.get("/users/:id", checkToken, userController.getUser);

export { servicesRouter };
