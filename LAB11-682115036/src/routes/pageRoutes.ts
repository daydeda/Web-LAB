import { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth";
const router = Router();
router.get("/", (req: Request, res: Response) => {
  const msg = req.query.msg;
  res.render("home", { msg });
});
router.get("/login", (req: Request, res: Response) => {
  const err = req.query.err;
  const msg = req.query.msg;
  res.render("login", { err, msg });
});
router.get("/profile", requireAuth, (req: Request, res: Response) => {
  res.render("profile", { user: (req as any).user });
});
export default router;
