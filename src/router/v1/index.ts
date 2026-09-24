import todoRouter from "#router/todoRouter/index.js";
import { Router, type Request, type Response } from "express";

const v1Router = Router();

v1Router.use("/todo", todoRouter);

export default v1Router;
