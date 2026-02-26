"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const seed_1 = require("./data/seed");
const requireLogin_1 = require("./middleware/requireLogin");
const app = (0, express_1.default)();
const PORT = 3000;
/**  Step 1: Configure Express + EJS + Static files */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(process.cwd(), "views"));
/**  Step 2: Configure session middleware (MemoryStore) */
// Session middleware (MemoryStore by default) — for learning/demo only
app.use((0, express_session_1.default)({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
}));
// home page
app.get("/", (req, res) => {
    res.render("index");
});
/**  Step 3: Implement login with seed users */
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = seed_1.seedUsers.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.render("index", { error: "Invalid username or password" });
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect("/todos");
});
/**  Step 5: Implement ToDo CRUD with seed data */
// ToDo list page (protected)
app.get("/todos", requireLogin_1.requireLogin, (req, res) => {
    res.render("list", {
        listTitle: "Today",
        items: seed_1.todoItems,
        username: req.session.username,
    });
});
// Add item (protected)
app.post("/add", requireLogin_1.requireLogin, (req, res) => {
    const newItem = req.body.newItem;
    if (newItem) {
        (0, seed_1.addTodo)(newItem);
    }
    res.redirect("/todos");
});
// Delete item (protected)
app.post("/delete", requireLogin_1.requireLogin, (req, res) => {
    const checkbox = req.body.checkbox;
    if (checkbox) {
        (0, seed_1.deleteTodo)(Number(checkbox));
    }
    res.redirect("/todos");
});
/** Step 6: Logout */
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect("/");
        }
        res.redirect("/");
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
