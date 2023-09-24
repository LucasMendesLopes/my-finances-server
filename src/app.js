import express, { json } from "express";
import { routes } from "./routes/router.js";
import cors from "cors";
import { conn } from "./db/conn.js";

const app = express();

conn();

app.use(cors());
app.use(json());
app.use(routes);

app.listen(3000);
