import { Router } from "express";
import { servicesRouter } from "./services.js";

const routes = Router();

routes.use("/", servicesRouter);

export { routes };
