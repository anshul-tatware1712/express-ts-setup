import type { Request, Response } from "express";

const todoController = {
  getAllTodos: (req: Request, res: Response) => {
    res.status(200).json({ message: "Get all todos" });
  },
  createTodo: (req: Request, res: Response) => {
    res.status(201).json({ message: "Create a new todo" });
  },
  deleteTodo: (req: Request, res: Response) => {
    res.status(200).json({ message: "Delete a todo" });
  },
};

export default todoController;
