import { Router } from "express";
import { checkToken } from "../utils/index.js";
import { categoriesController, financeController, userController } from "../controllers/index.js";

const servicesRouter = Router();

servicesRouter.post("/auth/signIn", userController.signIn);
servicesRouter.post("/auth/signUp", userController.signUp);
servicesRouter.post("/refresh-token", userController.refreshToken);
servicesRouter.get("/users/:id", checkToken, userController.getUser);

servicesRouter.get(
  "/finances/:userId",
  checkToken,
  financeController.getFinances
);
servicesRouter.post("/finances", checkToken, financeController.register);
servicesRouter.delete(
  "/finances/:financeId",
  checkToken,
  financeController.deleteFinance
);
servicesRouter.put(
  "/finances/:financeId",
  checkToken,
  financeController.editFinance
);

servicesRouter.get(
  "/categories/:userId",
  checkToken,
  categoriesController.getCategories
);
servicesRouter.post("/categories", checkToken, categoriesController.register);
servicesRouter.put(
  "/categories/:categoryId",
  checkToken,
  categoriesController.editCategory
);
servicesRouter.delete(
  "/categories/:categoryId",
  checkToken,
  categoriesController.deleteCategory
);

export { servicesRouter };
