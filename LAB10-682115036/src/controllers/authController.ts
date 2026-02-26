import { Request, Response } from "express";
import { seedUsers } from "../data/seed";

export const renderLogin = (req: Request, res: Response) => {
  res.render("index");
};

export const handleLogin = (req: Request, res: Response) => {
  const username = (req.body.username ?? "").toString().trim();
  const password = (req.body.password ?? "").toString().trim();
  const user = seedUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.render("index", { error: "Invalid username or password" });
  }
  req.session.userId = user.id;
  req.session.username = user.username;
  res.redirect("/todos");
};

export const handleLogout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.redirect("/");
  });
};
