import todoController from "#controller/todo.controller.js";
import { Router, type Request, type Response } from "express";

const todoRouter = Router();

todoRouter.get("/", todoController.getAllTodos);
todoRouter.post("/", todoController.createTodo);
todoRouter.delete("/:id", todoController.deleteTodo);

export default todoRouter;
