import type { Request, Response } from "express";
import fs from "fs";
import { NotFoundError } from "#utils/app.errors.js";

const todoController = {
  getAllTodos: async (req: Request, res: Response) => {
    await fs.promises.readFile("todos.json", "utf8");
    res.status(200).json({ message: "Get all todos" });
  },
  createTodo: (req: Request, res: Response) => {
    res.status(201).json({ message: "Create a new todo" });
  },
  deleteTodo: (req: Request, res: Response) => {
    throw new NotFoundError("Todo not found");
  },
};

export default todoController;
