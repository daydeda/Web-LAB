import { Request, Response } from "express";
import { getTodos, addTodo, deleteTodo } from "../data/seed";

export const getTodoList = (req: Request, res: Response) => {
  res.render("list", {
    listTitle: "Today",
    items: getTodos(),
    username: req.session.username,
  });
};

export const createTodo = (req: Request, res: Response) => {
  const newItem = req.body.newItem;
  if (newItem) {
    addTodo(newItem);
  }
  res.redirect("/todos");
};

export const removeTodo = (req: Request, res: Response) => {
  const checkbox = req.body.checkbox;
  if (checkbox) {
    deleteTodo(Number(checkbox));
  }
  res.redirect("/todos");
};
