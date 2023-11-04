import { Router } from "express";
import { userController } from "../controllers/UserController.js";
import { checkToken } from "../utils/index.js";
import { financeController } from "../controllers/FinanceController.js";

const servicesRouter = Router();

servicesRouter.post("/auth/signIn", userController.signIn);
servicesRouter.post("/auth/signUp", userController.signUp);
servicesRouter.post("/refresh-token", userController.refreshToken);
servicesRouter.get("/users/:id", checkToken, userController.getUser);

servicesRouter.post("/finances", checkToken, financeController.register);
servicesRouter.get(
  "/finances/:userId",
  checkToken,
  financeController.getFinances
);

export { servicesRouter };
