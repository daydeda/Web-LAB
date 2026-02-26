import fs from "fs";
import path from "path";

export type User = { id: number; username: string; password: string };
export type TodoItem = { id: number; name: string };

export const seedUsers: User[] = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

const todosFilePath = path.join(__dirname, "todos.json");

export function getTodos(): TodoItem[] {
  try {
    const data = fs.readFileSync(todosFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveTodos(todos: TodoItem[]) {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), "utf-8");
}

export function addTodo(name: string) {
  const todoItems = getTodos();
  const maxId = todoItems.reduce((m, it) => Math.max(m, it.id), 0);
  todoItems.push({ id: maxId + 1, name });
  saveTodos(todoItems);
}

export function deleteTodo(id: number) {
  let todoItems = getTodos();
  todoItems = todoItems.filter((it) => it.id !== id);
  saveTodos(todoItems);
}
