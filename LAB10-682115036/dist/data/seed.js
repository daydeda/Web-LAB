"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoItems = exports.seedUsers = void 0;
exports.addTodo = addTodo;
exports.deleteTodo = deleteTodo;
exports.seedUsers = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
];
// In-memory ToDo items (shared for all users in this demo)
exports.todoItems = [
    { id: 1, name: "Buy food" },
    { id: 2, name: "Read book" },
    { id: 3, name: "Do LAB12" },
];
function addTodo(name) {
    const maxId = exports.todoItems.reduce((m, it) => Math.max(m, it.id), 0);
    exports.todoItems.push({ id: maxId + 1, name });
}
function deleteTodo(id) {
    exports.todoItems = exports.todoItems.filter((it) => it.id !== id);
}
