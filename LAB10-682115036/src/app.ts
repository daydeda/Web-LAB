import express, { Request, Response } from "express";
import session from "express-session";
import path from "path";
import { renderLogin, handleLogin, handleLogout } from "./controllers/authController";
import { getTodoList, createTodo, removeTodo } from "./controllers/todoController";
import { requireLogin } from "./middleware/requireLogin";

const app = express();
const PORT = process.env.PORT || 8000;


/**  Step 1: Configure Express + EJS + Static files */
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));


/**  Step 2: Configure session middleware (MemoryStore) */
// Session middleware (MemoryStore by default) — for learning/demo only
app.use(
  session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60*60*1000 }
  })
);

// home page
app.get("/", renderLogin);

/**  Step 3: Implement login with seed users */
app.post("/login", handleLogin);

/**  Step 5: Implement ToDo CRUD with seed data */
// ToDo list page (protected)
app.get("/todos", requireLogin, getTodoList);

// Add item (protected)
app.post("/add", requireLogin, createTodo);

// Delete item (protected)
app.post("/delete", requireLogin, removeTodo);

/** Step 6: Logout */
app.post("/logout", handleLogout);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
