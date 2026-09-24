import todoController from "#controller/todo.controller.js";
import { validateSchema } from "#middleware/validation.middleware.js";
import { createTodo } from "#schemas/todo.schemas.js";
import { Router, type Request, type Response } from "express";

const todoRouter = Router();

todoRouter.get("/", todoController.getAllTodos);
todoRouter.post("/", validateSchema(createTodo), todoController.createTodo);
todoRouter.delete("/:id", todoController.deleteTodo);

export default todoRouter;
